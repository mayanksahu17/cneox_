import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: "#fff" },
  title: { fontSize: 22, marginBottom: 16, textAlign: "center", fontWeight: "bold" },
  table: { display: "table", width: "100%", borderWidth: 1, borderColor: "#ccc" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc" },
  tableHeader: { backgroundColor: "#f0f0f0", fontWeight: "bold" },
  tableCell: { padding: 8, fontSize: 10, width: "16.6%" },
  footer: { marginTop: 20, textAlign: "center", color: "#999", fontSize: 10 },
});

export default function ROIPDF({ data, title }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>PACKAGE</Text>
            <Text style={styles.tableCell}>INVESTMENT</Text>
            <Text style={styles.tableCell}>DATE</Text>
            <Text style={styles.tableCell}>EXPIRY</Text>
            <Text style={styles.tableCell}>ROI</Text>
          </View>
          {data.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.id}</Text>
              <Text style={styles.tableCell}>{item.package}</Text>
              <Text style={styles.tableCell}>${item.investedAmount}</Text>
              <Text style={styles.tableCell}>{item.date}</Text>
              <Text style={styles.tableCell}>{item.expiryDate}</Text>
              <Text style={styles.tableCell}>${item.roi}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Generated on {new Date().toLocaleString()}</Text>
      </Page>
    </Document>
  );
}