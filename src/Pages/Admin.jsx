import { useEffect, useState } from "react";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact");

      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
      setError("Could not load messages. Is backend running?");
    }
  };

  const deleteMessage = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: "DELETE",
      });
      fetchMessages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {messages.length === 0 && !error && <p>No messages found.</p>}

      {messages.map((msg) => (
        <div
          key={msg._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h4>{msg.name}</h4>
          <p><strong>Email:</strong> {msg.email}</p>
          <p>{msg.message}</p>
          <small>{new Date(msg.createdAt).toLocaleString()}</small>

          <br />
          <button
            onClick={() => deleteMessage(msg._id)}
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
