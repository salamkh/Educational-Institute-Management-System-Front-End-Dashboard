import { Link } from "react-router-dom";
import "./HR.css"
import { useEffect } from "react";

const HR = ({setTitle}) => {
  
    useEffect(() => {
       
        setTitle("قسم الموارد البشرية")
      
     

    }, [])
    return (
        <>

            <div className="sec_container">
                <Link to='/displayAccounts'>
                    <div className="sec_card" >
                        <div className="sec_content" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                            <h3>حسابات الموظفين   </h3>
                        </div>
                    </div>
                </Link>

                <Link to='/timeMonitoring'>
                    <div className="sec2" >
                        <div className="sec_content" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>تفقد الدوام   </h2>
                        </div>
                    </div>
                </Link>

                <Link to='/advance'>
                    <div className="sec3" >
                        <div className="sec_content_no">
                            <h2>السلف   </h2>
                        </div>
                    </div>
                </Link>

                <Link to='/panch'>
                    <div className="sec4" >
                        <div className="sec_content_no">
                            <h2 >الخصميات   </h2>
                        </div>
                    </div>
                </Link>
                <Link to='/gift'>
                    <div className="sec5" >
                        <div className="sec_content" style={{ right: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>المكافآت   </h2>
                        </div>
                    </div>
                </Link>

                <Link to='/workLeave'>
                    <div className="sec6" >
                        <div className="sec_content" style={{ right: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>الإجازات   </h2>
                        </div>
                    </div>
                </Link>
                <Link to='/pricing'>
                    <div className="sec7" >
                        <div className="sec_content" style={{ right: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>مستحقات الأساتذة</h2>
                        </div>
                    </div>
                </Link>
            </div >
        </>
    );
}

export default HR;