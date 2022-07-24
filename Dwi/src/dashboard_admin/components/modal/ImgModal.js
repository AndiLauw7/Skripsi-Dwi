import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ImgModal({show, handleClose, img}) {
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                style={{zIndex: 9999}}
            >
                <Modal.Body className='d-flex justify-content-center '>
                   <img src={img} alt="bukti pembayaran"  style={{width: 400}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
