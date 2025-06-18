import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { FileText, CheckCircle, Clock, AlertTriangle, TrendingUp, Users } from "lucide-react"

const reportesPorTecnico = [
  { name: "Técnico 1", reportes: 10 },
  { name: "Técnico 2", reportes: 7 },
  { name: "Técnico 3", reportes: 5 },
  { name: "Técnico 4", reportes: 12 },
]

const reportesPorMes = [
  { mes: "Ene", reportes: 45 },
  { mes: "Feb", reportes: 52 },
  { mes: "Mar", reportes: 48 },
  { mes: "Abr", reportes: 61 },
  { mes: "May", reportes: 55 },
  { mes: "Jun", reportes: 67 },
]

const estadoReportes = [
  { name: "Completados", value: 45, color: "#22c55e" },
  { name: "En Progreso", value: 23, color: "#f59e0b" },
  { name: "Pendientes", value: 12, color: "#ef4444" },
]

const tecnicos = [
  { nombre: "Juan Pérez", reportes: 12, estado: "Activo" },
  { nombre: "María García", reportes: 10, estado: "Activo" },
  { nombre: "Carlos López", reportes: 7, estado: "Ocupado" },
  { nombre: "Ana Martínez", reportes: 5, estado: "Disponible" },
]

export const DashboardComponent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 max-h-140 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Dashboard</h1>
        <p className="text-gray-600 text-center">Resumen general del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reportes</p>
              <p className="text-2xl font-bold text-gray-900">80</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12%</span>
            <span className="text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">56% del total</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Progreso</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">29% del total</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">15% del total</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Reportes por Técnico */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Reportes por Técnico</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportesPorTecnico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reportes" fill="#3b82f6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tendencia Mensual */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Tendencia Mensual</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportesPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reportes"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Estado de Reportes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Estado de Reportes</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadoReportes}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {estadoReportes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {estadoReportes.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Técnicos */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold">Técnicos Activos</h2>
          </div>
          <div className="space-y-4">
            {tecnicos.map((tecnico, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {tecnico.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tecnico.nombre}</p>
                    <p className="text-sm text-gray-600">{tecnico.reportes} reportes asignados</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tecnico.estado === "Activo"
                      ? "bg-green-100 text-green-800"
                      : tecnico.estado === "Ocupado"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {tecnico.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
