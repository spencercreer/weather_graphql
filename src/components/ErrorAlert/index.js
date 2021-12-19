import { Alert } from 'react-bootstrap'

export default function ErrorAlert({city, error}) {
    return (
        <>
            {error && <Alert variant='danger'><strong>{city}</strong> not found</Alert>}
        </>
    )
}

