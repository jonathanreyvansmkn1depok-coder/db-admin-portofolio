import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Admin() {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    const API_URL =
        'https://backend-production-1825.up.railway.app/api/messages'

    const fetchMessages = async () => {

        try {

            const res = await axios.get(API_URL)

            setMessages(res.data)

        } catch (error) {

            console.error(error)

            alert('Gagal mengambil data')

        } finally {

            setLoading(false)

        }

    }

    const deleteMessage = async (id) => {

        const confirmDelete =
            window.confirm('Hapus pesan ini?')

        if (!confirmDelete) return

        try {

            await axios.delete(
                `https://backend-production-1825.up.railway.app/api/messages/${id}`
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

            <h1 className="text-4xl font-bold mb-8">
                Dashboard Admin
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full border border-gray-700">

                    <thead>

                        <tr className="bg-gray-800">

                            <th className="p-3">ID</th>
                            <th className="p-3">Nama</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Pesan</th>
                            <th className="p-3">Aksi</th>

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
                                    {msg.message}
                                </td>

                                <td className="p-3">

                                    <button
                                        onClick={() =>
                                            deleteMessage(msg.id)
                                        }
                                        className="bg-red-600 px-4 py-2 rounded"
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