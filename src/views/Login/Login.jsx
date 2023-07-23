import {useEffect, useRef, useState} from "react";
import {initDb} from "../../db";
import './login.css'
import {Password} from "primereact/password";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Messages} from "primereact/messages";

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [db, setDb] = useState(null)

    const msg = useRef(null)
    useEffect(()=>{
        initDb().then(
            (res)=> {
                const db = new res.Database()
                setDb(db)
                db.exec('CREATE TABLE user (username TEXT, password TEXT, name TEXT)')
                db.exec("INSERT INTO user VALUES (\'admin\', \'admin123\', \'Administrador\')")
            },
            (err)=> {
                console.log('error de db init', err)
            })
    },[])

    const execQuery = () => {
        msg.current.clear()
        console.log('db', db)
        let query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";
        try {
            let res = db.exec(query)
            if (res.length === 0) {
                msg.current.show(
                    {sticky: true, severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas', closable: false}
                )
            } else {
                msg.current.show(
                    {sticky: true, severity: 'success', summary: 'Exito!', detail:'Bienvenido, ' + res[0].values[0], closable: false}
                )
            }
            console.log(res)
        } catch (e) {
            msg.current.show(
                {sticky: true, severity: 'error', summary: 'Error', detail: e.toString(), closable: false}
            )
        }

    }

    return (
        <main>
            <Card className={'login-container'} title={'Ingresar al sitio'}>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder={"Usuario"}
                    />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-unlock"></i>
                    </span>
                    <Password value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                              placeholder={'Contraseña'}
                              feedback={false}
                              toggleMask
                    />
                </div>
                <Messages ref={msg}/>
                <Button onClick={()=>execQuery()}>Ingresar</Button>
            </Card>
        </main>
    )
}
