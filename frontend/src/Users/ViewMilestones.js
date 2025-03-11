import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewMilestones() {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectID) {
      setError("Invalid project ID");
      setLoading(false);
      return;
    }
    loadMilestones();
  }, [projectID]);

  const loadMilestones = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/milestones/project/${projectID}`, {
        withCredentials: true, // For session-based auth
      });
      setMilestones(result.data || []);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("You are not authorized. Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        console.error("Error loading milestones:", error);
        setError("Failed to load milestones. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (milestoneID) => {
    navigate(`/edit-milestone/${milestoneID}`);
  };

  const handleDelete = async (milestoneID) => {
    if (!window.confirm("Are you sure you want to delete this milestone?")) return;
  
    console.log("Deleting milestoneID:", milestoneID);
    const originalMilestones = [...milestones];
    setMilestones(milestones.filter((m) => m.milestoneID !== milestoneID));
  
    try {
      await axios.delete(`http://localhost:8080/milestones/delete/${milestoneID}`, {
        withCredentials: true,
      });
      console.log("Milestone deleted successfully");
    } catch (error) {
      console.error("Error deleting milestone:", error.response || error.message);
      setMilestones(originalMilestones);
      alert(`Failed to delete: ${error.response?.data?.message || error.message}`);
    }
  };

  const styles = {
    // ... (unchanged styles)
  };

  if (loading) return <h2 style={styles.message}>Loading milestones...</h2>;
  if (error) return <h2 style={styles.message}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Milestones for ProjectID {projectID}</h2>
      <div style={styles.listContainer}>
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div key={milestone.milestoneID} style={styles.card}>
              <h6 style={styles.cardTitle}>{milestone.featureDescription || "No Description"}</h6>
              <p style={styles.paragraph}><strong>Start Date:</strong> {milestone.startDate ? new Date(milestone.startDate).toLocaleDateString() : "N/A"}</p>
              <p style={styles.paragraph}><strong>Target Date:</strong> {milestone.targetDate ? new Date(milestone.targetDate).toLocaleDateString() : "N/A"}</p>
              <p style={styles.paragraph}><strong>Status:</strong> {milestone.currentStatus || "N/A"}</p>
              <p style={styles.paragraph}><strong>SoW ID:</strong> {milestone.soWID || "N/A"}</p>
              <p style={styles.paragraph}><strong>Task ID:</strong> {milestone.taskID || "N/A"}</p>
              <div style={styles.buttonContainer}>
                <button style={styles.btn} onClick={() => handleEdit(milestone.milestoneID)}>Edit</button>
                <button style={{ ...styles.btn, ...styles.deleteBtn }} onClick={() => handleDelete(milestone.milestoneID)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.message}>No milestones available for this project.</p>
        )}
      </div>
    </div>
  );
}