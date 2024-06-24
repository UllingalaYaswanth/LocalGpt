import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; 

function Datasource() {

    const [searchTerm, setSearchTerm] = useState("");
    const [urls, setUrls] = useState([
        "https://example.com/url1",
        "https://example.com/url2",
        "https://example.com/url3",
        "https://example.com/url4"
    ]);
    const [showModal, setShowModal] = useState(false); 
    const [urlToRemove, setUrlToRemove] = useState(""); 
    const [newUrl, setNewUrl] = useState(""); 
    const [showUrlInput, setShowUrlInput] = useState(false);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle new URL input change
    const handleNewUrlChange = (event) => {
        setNewUrl(event.target.value);
    };

    // Function to add new URL to list
    const handleAddUrl = () => {
        if (newUrl.trim() !== "") {
            const updatedUrls = [...urls, newUrl.trim()];
            setUrls(updatedUrls);
            setNewUrl("");
            setShowUrlInput(false); 
        }
    };

    // Function to handle remove URL
    const handleRemoveUrl = () => {
        const updatedUrls = urls.filter(url => url !== urlToRemove);
        setUrls(updatedUrls);
        setShowModal(false); 
    };

    // Function to open modal and set URL to remove
    const confirmRemoveUrl = (url) => {
        setUrlToRemove(url);
        setShowModal(true);
    };

    // Filtered URLs based on search term
    const filteredUrls = urls.filter(url =>
        url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle showing URL input and adding URL
    const handleShowUrlInputAndAdd = () => {
        setShowUrlInput(true);
        handleAddUrl();
    };

    return (
        <div className="vh-100 w-100 d-flex flex-column align-items-center">
            <div className="mt-5 w-50 text-center">
                <h1>Data Sources</h1>
                <div className="d-flex align-items-center justify-content-between">
                <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                            required
                        />
                    {showUrlInput ? (
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={newUrl}
                            onChange={handleNewUrlChange}
                            className="form-control ms-4"
                            required
                        />
                    ) : (
                        null
                    )}
                    <button 
                        className="btn btn-success ms-3"
                        onClick={handleShowUrlInputAndAdd}
                    >
                        Add
                    </button>
                </div>
                <button className="btn btn-success mt-4">Search</button>
            </div>
            <div className="search-history mt-4 w-75 h-75 rounded">
                {filteredUrls.length > 0 ? (
                    <ul className="list-group mt-3 w-100 p-3">
                        {filteredUrls.map((url, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => confirmRemoveUrl(url)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No URLs found</p>
                )}
            </div>

            {/* Modal for confirmation */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this URL?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemoveUrl}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Datasource;
