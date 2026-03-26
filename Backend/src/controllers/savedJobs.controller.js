import pool from '../config/db.js';

/* ================= GET SAVED JOBS ================= */
export const savedJobs = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await pool.query(
            `SELECT 
                jobs.id,
                jobs.title,
                jobs.company,
                jobs.location,
                jobs.job_type,
                jobs.date_posted,
                jobs.job_url
             FROM saved_posts
             JOIN jobs ON saved_posts.job_id = jobs.id
             WHERE saved_posts.user_id = ?`,
            [userId]
        );

        return res.status(200).json({
            savedJobs: rows
        });

    } catch (err) {
        console.error("Fetch saved jobs error:", err.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* ================= SAVE JOB ================= */
export const saveJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await pool.query(
            `INSERT INTO saved_posts (user_id, job_id) VALUES (?, ?)`,
            [userId, jobId]
        );

        return res.status(201).json({
            message: "Job saved successfully",
            savedId: result.insertId
        });

    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Job already saved"
            });
        }

        console.error("Save job error:", e.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/* ================= REMOVE JOB ================= */
export const removeJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await pool.query(
            `DELETE FROM saved_posts WHERE job_id = ? AND user_id = ?`,
            [jobId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Saved job not found"
            });
        }

        return res.status(200).json({
            message: "Saved job removed successfully"
        });

    } catch (e) {
        console.error("Remove job error:", e.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};