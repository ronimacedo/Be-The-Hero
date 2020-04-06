import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './style.css'

function Profile() {
    const [incidents,setIncidents] = useState([])
    const ongID = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization:ongID
            }
        }).then(response => {
            setIncidents(response.data)
        })
    },[ongID])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongID
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        }catch(err) {
            alert('Erro ao deletar incidente, favor tentar novamente!!')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, { ongName }</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button" >
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               
               ))}
            </ul>
        </div>
    )
}

export default Profile