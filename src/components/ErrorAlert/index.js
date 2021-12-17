import { Alert } from 'react-bootstrap'

export default function ErrorAlert({error}) {
    return (
        <>
            {error && <Alert variant='danger'>City not found</Alert>}
        </>
    )
}

