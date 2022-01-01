import React, { useEffect, useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { formatReadableDate } from '../../utils/dateFormat';
import { myAxios } from '../../utils/axios';
export default function DailyDetail() {
    const { id } = useParams();
    const [daily, setDaily] = useState(null);
    const [content, setContent] = useState("");

    useEffect(() => {
        getDaily()
        return () => {
        }
    })

    const getDaily = async () => {
        const { data } = await myAxios.get(`/daily/${id}`)
        if (data) {
            setDaily(data)
        }
    }

    const handleSubmit = async () => {
        const data = await myAxios.post(`/daily`, { timestamp: id, content: content })
        if (data) {
            getDaily()
            setContent("");
        }
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            handleSubmit()
        }
    }


    return (
        <div className="daily-detail">
            <Container className="d-flex justify-content-center " style={{ height: 'calc(100vh - 56px)' }}>
                <Card className='w-100 d-flex justify-content-between' style={{ maxWidth: '800px', marginTop: '30px', marginBottom: '30px' }}>
                    <Card.Header>
                        <h3><b>Daily Notes</b></h3>
                        <h4>{formatReadableDate(id)}</h4>
                    </Card.Header>
                    <Card.Body style={{ height: '465px', overflow: 'auto' }}>
                        {daily && daily?.contents.map(d => {
                            return <div key={d} className="daily-note">
                                {d}
                            </div>
                        })}

                    </Card.Body>
                    <Card.Footer style={{ background: 'rgb(241, 241, 241)' }}>
                        <Form >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    className="daily-notes-textarea"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Write notes ..."
                                    onInput={(e) => { setContent(e.target.value) }}
                                    onKeyDown={handleEnter}
                                    value={content}
                                />
                            </Form.Group>
                        </Form>
                    </Card.Footer>
                </Card >
            </Container >
        </div >
    )
}
