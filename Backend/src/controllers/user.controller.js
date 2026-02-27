import pool from '../config/db.js'

export const currentUser=async (req,res)=>{
    const userId=req.user.id;

    try{
        const [rows]=await pool.query(`select id,name,email,role from users where id=?`,[userId]);

        if(rows.length===0){
            return res.status(404).json({
                message: "User not Found"
            })
        
        
        }

        res.status(200).json({
            user: rows[0]
        })
    }

    catch(error){
        console.log("Profile error:",error.message);
        res.status(500).json({
            message: "Internal Server error"
        })
    }



}