import { Link } from "react-router-dom";
import img from "../../../img/undraw_programming_re_kg9v.svg"
import "./Accounts.css"
import { Grid } from "@material-ui/core";

const Accounts = () => {
    return (
        <>
            <Grid container>
                <Grid item md={6} lg={6}>
                    <img src={img} className="imgAccount" />
                </Grid>
                <Grid item md={6} lg={6}>
                    <div className="sec_container" style={{ marginTop: "10%" }}>

                        <Link to='/displayAccounts'>
                            <div className="sec_card_accounts" >
                                <div className="sec_content_accounts" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                                    <h3>حسابات الموظفين   </h3>
                                </div>
                            </div>
                        </Link>

                        <Link to='/displayTeschers'>
                            <div className="sec2_accounts" >
                                <div className="sec_content_accounts" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                                    <h3>حسابات الأساتذة    </h3>
                                </div>
                            </div>
                        </Link>


                    </div >
                </Grid>
            </Grid>



        </>
    );
}

export default Accounts;