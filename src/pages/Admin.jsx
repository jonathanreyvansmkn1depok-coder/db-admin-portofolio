import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin() {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    const API_URL =
        'https://backend-production-1825.up.railway.app/api/messages'

    const fetchMessages = async () => {

        const token =
            localStorage.getItem('token')

        if (!token) {

            window.location.href = '/login'

            return

        }

        try {

            const res = await axios.get(
                API_URL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setMessages(res.data)

        } catch (error) {

            console.error(error)

            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem('token')

                window.location.href =
                    '/login'

            }

            alert('Gagal mengambil data')

        } finally {

            setLoading(false)

        }

    }

    const markAsRead = async (id) => {

        const token =
            localStorage.getItem('token')

        try {

            await axios.put(
                `${API_URL}/${id}/read`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            fetchMessages()

        } catch (error) {

            console.error(error)

            alert('Gagal mengubah status')

        }

    }

    const deleteMessage = async (id) => {

        const confirmDelete =
            window.confirm(
                'Hapus pesan ini?'
            )

        if (!confirmDelete) return

        const token =
            localStorage.getItem('token')

        try {

            await axios.delete(
                `${API_URL}/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

            fetchMessages()

        } catch (error) {

            console.error(error)

            alert('Gagal menghapus')

        }

    }

    useEffect(() => {

        fetchMessages()

    }, [])

    if (loading) {

        return (
            <div className="text-white p-10">
                Loading...
            </div>
        )

    }

    return (

        <div className="max-w-7xl mx-auto p-8 text-white">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Dashboard Admin
                </h1>

                <button
                    onClick={() => {

                        localStorage.removeItem(
                            "token"
                        )

                        window.location.href =
                            "/login"

                    }}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full border border-gray-700">

                    <thead>

                        <tr className="bg-gray-800">

                            <th className="p-3">
                                ID
                            </th>

                            <th className="p-3">
                                Nama
                            </th>

                            <th className="p-3">
                                Email
                            </th>

                            <th className="p-3">
                                Status
                            </th>

                            <th className="p-3">
                                Pesan
                            </th>

                            <th className="p-3">
                                Aksi
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {messages.map((msg) => (

                            <tr
                                key={msg.id}
                                className="border-t border-gray-700"
                            >

                                <td className="p-3">
                                    {msg.id}
                                </td>

                                <td className="p-3">
                                    {msg.name}
                                </td>

                                <td className="p-3">
                                    {msg.email}
                                </td>

                                <td className="p-3">

                                    <span
                                        className={
                                            msg.status === 'read'
                                                ? 'text-green-400 font-bold'
                                                : 'text-yellow-400 font-bold'
                                        }
                                    >
                                        {msg.status}
                                    </span>

                                </td>

                                <td className="p-3">
                                    {msg.message}
                                </td>

                                <td className="p-3 flex gap-2">

                                    {msg.status === 'unread' && (

                                        <button
                                            onClick={() =>
                                                markAsRead(
                                                    msg.id
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                                        >
                                            Tandai Dibaca
                                        </button>

                                    )}

                                    <button
                                        onClick={() =>
                                            deleteMessage(
                                                msg.id
                                            )
                                        }
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                                    >
                                        Hapus
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}