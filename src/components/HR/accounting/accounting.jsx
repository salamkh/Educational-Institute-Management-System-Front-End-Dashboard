import { Link } from "react-router-dom";
import "./accounting.css"
import { useEffect } from "react";

const ACCOUNTING = ({setTitle}) => {
  
    useEffect(() => {
       
        setTitle("قسم المحاسبة المالية ")
      
     

    }, [])
    return (
        <>

            <div className="sec_container_fin">
                <Link to='/displayAccounts'>
                    <div className="sec_card_fin" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                            <h3>الدورات المالية</h3>
                        </div>
                    </div>
                </Link>

                <Link to='/timeMonitoring'>
                    <div className="sec2_fin" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>العمليات المالية    </h2>
                        </div>
                    </div>
                </Link>

                <Link to='/advance'>
                    <div className="sec3_fin" >
                        <div className="sec_content_no_fin">
                            <h2>الرواتب</h2>
                        </div>
                    </div>
                </Link>

                <Link to='/panch'>
                    <div className="sec4_fin" >
                        <div className="sec_content_no_fin">
                            <h2 >الأقساط   </h2>
                        </div>
                    </div>
                </Link>
                <Link to='/panch'>
                    <div className="sec5_fin" >
                        <div className="sec_content_no_fin">
                            <h2 >التقارير   </h2>
                        </div>
                    </div>
                </Link>
           
            </div >
        </>
    );
}

export default ACCOUNTING;