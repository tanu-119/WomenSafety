import React, { useState, useEffect } from "react";
import axios from "axios";

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ name: "", relation: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch contacts on component mount
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/emergency-contacts", { withCredentials: true });
            setContacts(response.data.contacts);
        } catch (err) {
            setError("Failed to fetch contacts.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/emergency-contacts",
                newContact,
                { withCredentials: true }
            );
            setContacts([...contacts, response.data.contact]);
            setNewContact({ name: "", relation: "", phone: "" });
            setIsFormVisible(false); // Hide the form after adding a contact
        } catch (err) {
            setError("Failed to add contact.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteContact = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/emergency-contacts/${id}`, { withCredentials: true });
            setContacts(contacts.filter((contact) => contact._id !== id));
        } catch (err) {
            setError("Failed to delete contact.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false); // Hide the form
        setNewContact({ name: "", relation: "", phone: "" }); // Reset the form fields
    };

    return (
        <div className="emergency-contacts">
            {error && <p className="error-message">{error}</p>}
            {loading && <p>Loading...</p>}

            {/* Add Contact Button */}
            {!isFormVisible && (
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="add-contact-btn"
                >
                    Add Contact
                </button>
            )}

            {/* Add Contact Form */}
            {isFormVisible && (
                <div className="add-contact-form">
                    <form onSubmit={handleAddContact}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={newContact.name}
                                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Relation:
                            <input
                                type="text"
                                value={newContact.relation}
                                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                value={newContact.phone}
                                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                                required
                            />
                        </label>
                        <div className="form-actions">
                            <button type="submit">Add Contact</button>
                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Contact List */}
            <ul className="contacts-list">
                {contacts.map((contact) => (
                    <li key={contact._id} className="contact-item">
                        <span>
                            <strong>{contact.name}</strong> ({contact.relation}) - {contact.phone}
                        </span>
                        <button
                            onClick={() => handleDeleteContact(contact._id)}
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmergencyContacts;
