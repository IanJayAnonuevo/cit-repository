import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CapstoneProjects() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('Category')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [uploadedFile, setUploadedFile] = useState(null)
  
  // Sample data
  const [capstones, setCapstones] = useState([
    { id: 'CP001', title: 'Capstone Title', author: 'Surname et al.', category: 'Mobile Application', year: '2021' },
    { id: 'CP002', title: 'Capstone Title', author: 'Surname et al.', category: 'Mobile Application', year: '2021' },
    { id: 'CP003', title: 'Capstone Title', author: 'Surname et al.', category: 'Web Application', year: '2022' },
    { id: 'CP004', title: 'Capstone Title', author: 'Surname et al.', category: 'IoT', year: '2021' },
    { id: 'CP005', title: 'Capstone Title', author: 'Surname et al.', category: 'Networking', year: '2023' },
  ])

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    year: '',
    file: null
  })

  const itemsPerPage = 5

  useEffect(() => {
    // Add shimmer animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
    `
    document.head.appendChild(style)

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
    }
  }, [])

  const handleAdd = () => {
    setFormData({ id: '', title: '', author: '', category: '', year: '', file: null })
    setUploadedFile(null)
    setIsModalOpen(true)
  }

  const handleEdit = (capstone) => {
    setFormData({ ...capstone, file: null })
    setUploadedFile(null)
    setIsModalOpen(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      setFormData({ ...formData, file: file })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this capstone project?')) {
      setCapstones(capstones.filter(c => c.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.id) {
      // Edit existing
      setCapstones(capstones.map(c => c.id === formData.id ? { ...formData, file: uploadedFile ? uploadedFile.name : c.file } : c))
    } else {
      // Add new
      const newId = `CP${String(capstones.length + 1).padStart(3, '0')}`
      setCapstones([...capstones, { ...formData, id: newId, file: uploadedFile ? uploadedFile.name : null }])
    }
    setIsModalOpen(false)
    setFormData({ id: '', title: '', author: '', category: '', year: '', file: null })
    setUploadedFile(null)
  }

  const filteredCapstones = capstones.filter(capstone => {
    const matchesCategory = categoryFilter === 'Category' || capstone.category === categoryFilter
    const matchesSearch = !searchQuery || 
      capstone.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capstone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capstone.author.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const totalFilteredPages = Math.ceil(filteredCapstones.length / itemsPerPage) || 1
  const paginatedCapstones = filteredCapstones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalFilteredPages && totalFilteredPages > 0) {
      setCurrentPage(1)
    }
  }, [totalFilteredPages, currentPage])

  // Skeleton Components
  const SkeletonShimmer = ({ className = "" }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  )

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <td key={num} className="py-3 px-4">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden">
            <SkeletonShimmer />
          </div>
        </td>
      ))}
    </tr>
  )

  const SkeletonControls = () => (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="h-4 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded relative overflow-hidden">
          <SkeletonShimmer />
        </div>
        <div className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <SkeletonShimmer />
        </div>
        <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <SkeletonShimmer />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <SkeletonShimmer />
        </div>
        <div className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg relative overflow-hidden">
          <SkeletonShimmer />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-20 bg-purple-900 flex flex-col items-center py-6 gap-6 h-screen fixed left-0 top-0 overflow-hidden">
        {/* Dashboard Icon */}
        <div 
          onClick={() => navigate('/admin/dashboard')}
          className="w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-purple-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>

        {/* Document Icon */}
        <div 
          onClick={() => navigate('/admin/capstone-projects')}
          className="w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-purple-800 rounded-lg transition-colors bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* User Settings Icon */}
        <div className="w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-purple-800 rounded-lg transition-colors relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <svg className="w-3 h-3 absolute bottom-0 right-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Logout Icon */}
        <div className="mt-auto w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-purple-800 rounded-lg transition-colors" onClick={() => navigate('/admin/login')}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Capstone</span>{' '}
            <span className="text-gray-900">Projects</span>
          </h1>
        </div>

        {/* Controls and Table Container */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Filters and Search */}
          {isLoading ? (
            <SkeletonControls />
          ) : (
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Filters */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Recent">Recent</option>
                  <option value="Popular">Popular</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Category">Category</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Networking">Networking</option>
                  <option value="IoT">IoT</option>
                </select>
              </div>

              {/* Add Button and Search */}
              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search capstone..."
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Capstone ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Author</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : (
                  paginatedCapstones.map((capstone, index) => (
                    <tr key={capstone.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm text-gray-900">{capstone.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{capstone.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{capstone.author}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{capstone.category}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{capstone.year}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(capstone)}
                            className="text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(capstone.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && (
            <div className="flex items-center justify-center mt-6 gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-700 px-4">
                {currentPage} of {totalFilteredPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalFilteredPages, prev + 1))}
                disabled={currentPage >= totalFilteredPages}
                className="p-2 text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.id ? 'Edit' : 'Add'} Capstone Project
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Surname et al."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Networking">Networking</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="2021"
                      required
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                      </span>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>File selected: {uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFile(null)
                          setFormData({ ...formData, file: null })
                          document.getElementById('file-upload').value = ''
                        }}
                        className="text-red-500 hover:text-red-600 ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    {formData.id ? 'Update' : 'Add'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

