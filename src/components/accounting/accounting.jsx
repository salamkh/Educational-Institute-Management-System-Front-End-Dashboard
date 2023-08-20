import { Link } from "react-router-dom";
import "./accounting.css"
import { useEffect } from "react";

const ACCOUNTING = ({ setTitle }) => {

    useEffect(() => {

        setTitle("قسم المحاسبة المالية ")

    }, [])
    return (
        <>

            <div className="sec_container_fin">
                <Link to='/finPeriod'>
                    <div className="sec_card_fin" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px", width: "100px" }}>
                            <h4>الدورات المالية</h4>
                        </div>
                    </div>
                </Link>
                <Link to='/finAccount'>
                    <div className="sec_card_fin_1" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px", width: "100px" }}>
                            <h4>الحسابات المالية</h4>
                        </div>
                    </div>
                </Link>
                <Link to='/operations'>
                    <div className="sec2_fin" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px", width: "100px" }}>
                            <h4>العمليات المالية</h4>
                        </div>
                    </div>
                </Link>

                <Link to='/payments'>
                    <div className="sec3_fin" >
                        <div className="sec_content_fin" style={{ left: 0, bottom: 0, borderRadius: "20px", width: "100px" }}>
                            <h4>الرواتب</h4>
                        </div>
                    </div>
                </Link>

                <Link to='/stdOperations'>
                    <div className="sec4_fin" >
                        <div className="sec_content_no_fin">
                            <h4 >الأقساط</h4>
                        </div>
                    </div>
                </Link>
                <Link to='/gift'>
                    <div className="sec5_fin" >
                        <div className="sec_content_fin" style={{ right: 0, bottom: 0, borderRadius: "20px" }}>
                            <h4>التقارير</h4>
                        </div>
                    </div>
                </Link>

                {/* <Link to='/workLeave'>
                    <div className="sec6" >
                        <div className="sec_content" style={{ right: 0, bottom: 0, borderRadius: "20px" }}>
                            <h2>الإجازات   </h2>
                        </div>
                    </div>
                </Link> */}
            </div >
        </>
    );
}

export default ACCOUNTING;