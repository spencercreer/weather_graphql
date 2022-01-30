import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function ErrorAlert({city, error}) {
    return (
        <>
            {error && <Alert variant='danger'><strong>{city}</strong> not found</Alert>}
        </>
    )
}

ErrorAlert.propTypes = {
    city: PropTypes.string,
    error: PropTypes.bool,
}

