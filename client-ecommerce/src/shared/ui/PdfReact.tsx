import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import type { OrderResponse } from '../../features/orders/types/order.types';
import moment from 'moment';
import type { User } from '../../features/auth/types/auth.types';

// Estilos (Yoga + flexbox)
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 60,
        objectFit: 'contain', // o 'cover' si prefieres
    },
    companyInfo: {
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 12,
        color: '#555',
    },
    section: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    colDesc: { width: '40%' },
    colQty: { width: '15%', textAlign: 'center' },
    colPrice: { width: '20%', textAlign: 'right' },
    colTotal: { width: '25%', textAlign: 'right' },
    totals: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 6,
    },
    grandTotal: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 6,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#777',
        fontSize: 9,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
});

interface PDFProps {
    orderData: OrderResponse | undefined;
    orderItems: OrderResponse["items"] | undefined;
    user: User | null;
}

// Componente principal del documento PDF
const PDF: React.FC<PDFProps> = ({ orderData, orderItems, user }) => (
    <Document title={`Factura ${orderData?.id}`}>
        <Page size="A4" style={styles.page}>
            {/* Header con logo y datos emisor */}
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    src={logo}
                />

                <View style={styles.companyInfo}>
                    <Text style={styles.title}>FACTURA</Text>
                    <Text>N° {orderData?.trackingNumber}</Text>
                    <Text>Fecha: {moment(orderData?.createdAt).format('DD/MM/YYYY')}</Text>
                </View>
            </View>

            {/* Datos emisor y cliente */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                <View>
                    <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 5 }}>
                        {user?.firstName + " " + user?.lastName}
                    </Text>
                    <Text>ZipCode: {orderData?.address?.zipCode}</Text>
                    <Text>{orderData?.address?.street + " " + orderData?.address?.city + " " + orderData?.address?.state}</Text>
                    <Text>Tel: {user?.phone}</Text>
                    <Text>{user?.email}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 5 }}>Cliente</Text>
                    <Text>{user?.firstName + " " + user?.lastName}</Text>
                    <Text>{user?.email}</Text>
                </View>
            </View>

            {/* Tabla de productos */}
            <View>
                <View style={styles.tableHeader}>
                    <Text style={styles.colDesc}>Descripción</Text>
                    <Text style={styles.colQty}>Cant.</Text>
                    <Text style={styles.colPrice}>Precio unit.</Text>
                    <Text style={styles.colTotal}>Total</Text>
                </View>

                {orderItems?.map((item, index) => {
                    const totalItem = item.quantity * item.price;
                    return (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.colDesc}>{item.productName}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colPrice}>
                                ${item.price.toLocaleString('es-CO')}
                            </Text>
                            <Text style={styles.colTotal}>
                                ${totalItem.toLocaleString('es-CO')}
                            </Text>
                        </View>
                    );
                })}
            </View>

            {/* Totales */}
            <View style={styles.totals}>
                <View style={styles.totalLine}>
                    <Text>Subtotal:</Text>
                    <Text>${orderData?.subtotal.toLocaleString('es-CO')}</Text>
                </View>
                <View style={styles.totalLine}>
                    <Text>IVA ({orderData?.tax}%):</Text>
                    <Text>${Math.round(orderData?.tax!).toLocaleString('es-CO')}</Text>
                </View>
                <View style={[styles.totalLine, styles.grandTotal]}>
                    <Text>Total a pagar:</Text>
                    <Text>${Math.round(orderData?.total!).toLocaleString('es-CO')}</Text>
                </View>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                Gracias por su compra • EleCommerce • Factura electrónica válida para impuestos
            </Text>
        </Page>
    </Document>
);

export default PDF;