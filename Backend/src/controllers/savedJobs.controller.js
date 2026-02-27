import pool from '../config/db.js'


export const savedJobs=async (req,res)=>{
    const userId=req.user.id;

    try{
        const [rows]=await pool.query(`
                select jobs.id,jobs.title,jobs.company,jobs.location,jobs.job_type,jobs.date_posted,jobs.job_url
                from 
                saved_posts join jobs on saved_posts.job_id = jobs.id where saved_posts.user_id =?
            `,[userId])


        if(rows.length===0){
            return res.status(404).json({
                message: "you saved nothing here!!!"
            })
        }

        return res.status(200).json({
            savedJobs: rows
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Error"
        })
    }
}


export const saveJob=async (req,res)=>{
    const {jobId}=req.params;
    const userId=req.user.id;

    try{
       const [result]= await pool.query(`insert into saved_posts(user_id,job_id) values(?,?)`,[userId,jobId])

        return res.status(201).json({
            message: 'Job saved succesfully',
            savedId: result.insertId
        })
    }
    catch(e){
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json({
                message: "Job already saved"
            })
        }
    }
}


// export const removeJob = async (req,res)=>{
//     const {jobId}=req.params;
//     const userId=req.user.id;

//     try{

//         const [result]=pool.query(`delete from saved_posts where job_id=? and user_id =?`,[jobId,userId])

//         if(result.affectedRows ===0){
//             return res.status(404).json({
//                 message: "saved job not found"
//             })
//         }
//         return res.json.status(200).json({
//             message: "saved job removed successfully"
//         })
//     }
//     catch(e){
//         return res.status(500).json({
//             message: e.message
//         })
//     }
// }



export const removeJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await pool.query(
            "DELETE FROM saved_posts WHERE job_id = ? AND user_id = ?",
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