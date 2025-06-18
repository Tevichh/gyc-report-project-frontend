import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottom: 2,
    borderBottomColor: "#000",
    paddingBottom: 5,
  },
  headerLeft: {
    flex: 1,
    fontSize: 8,
  },
  headerCenter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 80,
    height: 40,
  },
  infoSection: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 1,
    borderBottomColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#4472C4",
    color: "white",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
    fontSize: 9,
  },
  tableCellSmall: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    width: 60,
    fontSize: 9,
  },
  tableCellMedium: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    width: 100,
    fontSize: 9,
  },
  sectionHeader: {
    backgroundColor: "#4472C4",
    color: "white",
    padding: 5,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 10,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  infoItem: {
    width: "33.33%",
    padding: 2,
    fontSize: 9,
  },
  infoItemWide: {
    width: "50%",
    padding: 2,
    fontSize: 9,
  },
  infoItemFull: {
    width: "100%",
    padding: 2,
    fontSize: 9,
  },
  label: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 9,
    textAlign: "justify",
  },
  checkboxSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 9,
    marginLeft: 5,
  },
  signatureSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    height: 60,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  signatureLabel: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 5,
  },
})

// Función para crear el PDF y descargarlo
export async function generarReportePDF(reporte: any) {
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.label}>Código: PP-HSEQ-F-27</Text>
            <Text style={styles.label}>Versión: 1.0</Text>
            <Text style={styles.label}>Fecha: {new Date().toLocaleDateString()}</Text>
            <Text style={styles.label}>Página: 1 de 1</Text>
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>INFORME DE SOPORTE TÉCNICO/MANTENIMIENTO</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.label, { fontSize: 12 }]}>G&C</Text>
            <Text style={{ fontSize: 8 }}>Consultoría y Sistemas</Text>
          </View>
        </View>

        {/* Información básica */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>FECHA</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>HORA INICIO</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>HORA FIN</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>TIPO DE ACTIVIDAD</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>SOPORTE</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Date(reporte.fechaInicio).toLocaleDateString()}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Date(reporte.fechaInicio).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Date(reporte.fechafin).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.tipoActividad}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>TÉCNICO</Text>
            </View>
          </View>
        </View>

        {/* Segunda fila de información */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>No. TICKET</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>ZONA</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>SISTEMA</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>LOCACIÓN</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{reporte.NoTicket}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.zona}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.sistema}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.locacion}</Text>
            </View>
          </View>
        </View>

        {/* Cliente y proyecto */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>CLIENTE/PROYECTO:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.cliente}</Text>
            </View>
            <View style={[styles.tableCell, { backgroundColor: "#B4C6E7" }]}>
              <Text style={styles.label}>NOMBRE DEL PUNTO:</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{reporte.nombrePunto}</Text>
            </View>
          </View>
        </View>

        {/* Información de visita */}
        <Text style={styles.sectionHeader}>INFORMACIÓN DE VISITA</Text>
        <Text style={[styles.sectionHeader, { backgroundColor: "#D9E1F2", color: "black" }]}>
          Descripción de la Solicitud del Cliente o Daño Reportado
        </Text>
        <View style={styles.description}>
          <Text>{reporte.descripcionSolicitud}</Text>
        </View>

        {/* Información del equipo */}
        <Text style={[styles.sectionHeader, { backgroundColor: "#D9E1F2", color: "black" }]}>
          Información del Punto/Equipo Intervenido
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>EQUIPO</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>SERIAL</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>ACTIVIDAD REALIZADA</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeader]}>
              <Text>Descripción</Text>
            </View>
          </View>
          {reporte.equiposIntervenidos.map((equipo: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{equipo.equipo}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{equipo.serial}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Mantenimiento</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Serial: {equipo.serialAnterior || equipo.serial}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Origen de la falla */}
        <Text style={[styles.sectionHeader, { backgroundColor: "#D9E1F2", color: "black" }]}>
          Origen de la Falla (si aplica)
        </Text>
        <View style={styles.checkboxSection}>
          <View style={styles.checkbox}>
            <Text>☐ Uso incorrecto</Text>
          </View>
          <View style={styles.checkbox}>
            <Text>☐ Fallos eléctricos</Text>
          </View>
          <View style={styles.checkbox}>
            <Text>☐ Daños en el equipo</Text>
          </View>
          <View style={styles.checkbox}>
            <Text>☐ Otro: ¿Cuál?</Text>
          </View>
        </View>

        {/* Descripción de actividades */}
        <Text style={[styles.sectionHeader, { backgroundColor: "#D9E1F2", color: "black" }]}>
          Descripción de las Actividades Realizadas
        </Text>
        <View style={styles.description}>
          <Text>{reporte.descripcionActividad}</Text>
        </View>

        {/* Evidencia fotográfica */}
        <Text style={styles.sectionHeader}>Evidencia Fotográfica</Text>
        <View style={{ height: 100, borderWidth: 1, borderColor: "#000", marginBottom: 10 }}>
          <Text style={{ padding: 5, fontSize: 8 }}>FOTOGRAFÍAS INSTALACIÓN DE CÁMARA</Text>
        </View>

        {/* Datos de cierre */}
        <Text style={styles.sectionHeader}>Datos de Cierre</Text>
        <View style={styles.checkboxSection}>
          <View style={styles.checkbox}>
            <Text>¿Se Solucionó el Requerimiento? </Text>
            <Text>{reporte.SolucionoRequimiento ? "☑ Sí" : "☐ Sí"}</Text>
            <Text>{!reporte.SolucionoRequimiento ? "☑ No" : "☐ No"}</Text>
          </View>
        </View>

        <View style={styles.checkboxSection}>
          <View style={styles.checkbox}>
            <Text>¿Requiere Nueva Intervención? </Text>
            <Text>{reporte.nuevaIntervencion ? "☑ Sí" : "☐ Sí"}</Text>
            <Text>{!reporte.nuevaIntervencion ? "☑ No" : "☐ No"}</Text>
          </View>
        </View>

        {/* Técnico responsable */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItemWide}>
            <Text>
              <Text style={styles.label}>Elaboró: Técnico/Ingeniero G&C SAS:</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Nombre: </Text>
              {reporte.tecnicoResponsable.nombres} {reporte.tecnicoResponsable.apellidos}
            </Text>
            <Text>
              <Text style={styles.label}>Cargo: </Text>
              {reporte.tecnicoResponsable.cargo}
            </Text>
            <Text>
              <Text style={styles.label}>Fecha: </Text>
              {new Date(reporte.fechaInicio).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.infoItemWide}>
            <Text>
              <Text style={styles.label}>Recibe: Delegado cliente</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Nombre: </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Cargo: </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Observaciones:</Text>
            </Text>
          </View>
        </View>

        {/* Firmas */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Firmas de aprobación</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Recibe: Delegado cliente</Text>
          </View>
        </View>
      </Page>
    </Document>
  )

  // Genera el blob del PDF
  const blob = await pdf(doc).toBlob()

  // Descarga el PDF
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Informe_Soporte_${reporte.idReporte}.pdf`
  link.click()

  // Limpia el objeto URL
  URL.revokeObjectURL(url)
}
