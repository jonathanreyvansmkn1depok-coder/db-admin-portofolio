import { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function Admin() {

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

const messagesPerPage = 5

    const totalMessages = messages.length

const readMessages =
    messages.filter(
        msg => msg.status === 'read'
    ).length

const unreadMessages =
    messages.filter(
        msg => msg.status === 'unread'
    ).length

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
            
            console.log('DATA API:', res.data)

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

const filteredMessages =
    messages.filter((msg) => {

        const cocokSearch =

            msg.name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            msg.email
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            msg.message
                .toLowerCase()
                .includes(search.toLowerCase())

        const cocokStatus =

            filterStatus === 'all'

            ||

            msg.status === filterStatus

        return (
            cocokSearch &&
            cocokStatus
        )

    })

const indexOfLastMessage =
    currentPage * messagesPerPage

const indexOfFirstMessage =
    indexOfLastMessage - messagesPerPage

const currentMessages =
    filteredMessages.slice(
        indexOfFirstMessage,
        indexOfLastMessage
    )

const totalPages =
    Math.ceil(
        filteredMessages.length /
        messagesPerPage
    )

    const exportExcel = () => {

    const data = messages.map(
        (msg) => ({

            ID: msg.id,

            Nama: msg.name,

            Email: msg.email,

            Status: msg.status,

            Pesan: msg.message

        })
    )

    const worksheet =
        XLSX.utils.json_to_sheet(data)

    const workbook =
        XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        'Pesan'
    )

    const excelBuffer =
        XLSX.write(
            workbook,
            {
                bookType: 'xlsx',
                type: 'array'
            }
        )

    const fileData =
        new Blob(
            [excelBuffer],
            {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        )

    saveAs(
        fileData,
        'pesan-contact.xlsx'
    )

}

    return (

        <div className="max-w-7xl mx-auto p-8 text-white">

            <div className="flex justify-between items-center mb-8">

    <h1 className="text-4xl font-bold">
        Dashboard Admin
    </h1>

    <div className="flex gap-3">

        <button
            onClick={exportExcel}
            className="
                bg-green-600
                hover:bg-green-700
                px-4
                py-2
                rounded
            "
        >
            Export Excel
        </button>

        <button
            onClick={() => {

                localStorage.removeItem(
                    'token'
                )

                window.location.href =
                    '/login'

            }}
            className="
                bg-red-600
                hover:bg-red-700
                px-4
                py-2
                rounded
            "
        >
            Logout
        </button>

    </div>

</div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                <div className="bg-slate-800 p-6 rounded-xl text-center">

                    <h2 className="text-gray-300">
                        Total Pesan
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {totalMessages}
                    </p>

                </div>

                <div className="bg-green-800 p-6 rounded-xl text-center">

                    <h2 className="text-gray-100">
                        Sudah Dibaca
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {readMessages}
                    </p>

                </div>

                <div className="bg-yellow-600 p-6 rounded-xl text-center">

                    <h2 className="text-black">
                        Belum Dibaca
                    </h2>

                    <p className="text-4xl font-bold mt-2">
                        {unreadMessages}
                    </p>

                </div>

            </div>

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="Cari nama, email, atau pesan..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="
                        w-full
                        p-3
                        rounded-lg
                        bg-slate-800
                        border
                        border-slate-600
                        text-white
                    "
                />

            </div>

            <div className="flex flex-wrap gap-4 mb-6">

                <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded-lg ${
                        filterStatus === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-600 text-gray-300'
                    }`}
                >
                    Semua
                </button>

                <button
                    onClick={() => setFilterStatus('read')}
                    className={`px-4 py-2 rounded-lg ${
                        filterStatus === 'read'
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-600 text-gray-300'
                    }`}
                >
                    Sudah Dibaca
                </button>

                <button
                    onClick={() => setFilterStatus('unread')}
                    className={`px-4 py-2 rounded-lg ${
                        filterStatus === 'unread'
                            ? 'bg-yellow-600 text-black'
                            : 'bg-slate-600 text-gray-300'
                    }`}
                >
                    Belum Dibaca
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

                            <th className="p-3">
                                Tanggal
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {currentMessages.map((msg) => (

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
                                    -
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
                                            setSelectedMessage(msg)
                                        }
                                        className="
                                            bg-green-600
                                            hover:bg-green-700
                                            px-4
                                            py-2
                                            rounded
                                        "
                                    >
                                        Detail
                                    </button>
                                    
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

<div className="flex justify-center gap-2 mt-6">

    <button
        disabled={currentPage === 1}
        onClick={() =>
            setCurrentPage(
                currentPage - 1
            )
        }
        className="
            bg-slate-700
            px-4
            py-2
            rounded
            disabled:opacity-50
        "
    >
        Prev
    </button>

    <span className="px-4 py-2">
        Halaman {currentPage} dari {totalPages}
    </span>

    <button
        disabled={
            currentPage === totalPages
        }
        onClick={() =>
            setCurrentPage(
                currentPage + 1
            )
        }
        className="
            bg-slate-700
            px-4
            py-2
            rounded
            disabled:opacity-50
        "
    >
        Next
    </button>

</div>

{selectedMessage && (

    <div
        className="
            fixed
            inset-0
            bg-black/70
            flex
            items-center
            justify-center
            z-50
        "
    >

        <div
            className="
                bg-slate-900
                p-8
                rounded-xl
                w-[600px]
                max-w-[90%]
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    mb-6
                "
            >
                Detail Pesan
            </h2>

            <p className="mb-3">
                <strong>Nama:</strong>
                {' '}
                {selectedMessage.name}
            </p>

            <p className="mb-3">
                <strong>Email:</strong>
                {' '}
                {selectedMessage.email}
            </p>

            <div className="mb-6">

                <strong>Pesan:</strong>

                <div
                    className="
                        mt-2
                        bg-slate-800
                        p-4
                        rounded
                    "
                >
                    {selectedMessage.message}
                </div>

            </div>

            <button
                onClick={() =>
                    setSelectedMessage(null)
                }
                className="
                    bg-red-600
                    hover:bg-red-700
                    px-4
                    py-2
                    rounded
                "
            >
                Tutup
            </button>

        </div>

    </div>

)}            
            </div>

        </div>

    )

}