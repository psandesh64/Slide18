import Alert from 'react-bootstrap/Alert'
const NotificationMsg =({ noti }) => {
    const merostyle = noti ? { display:'block' } :{ display:'none' }
    return (
        <div style={merostyle}>
            <Alert key={noti.css} variant={noti.css}>{noti.status}</Alert>
        </div>
    )
}
export default NotificationMsg