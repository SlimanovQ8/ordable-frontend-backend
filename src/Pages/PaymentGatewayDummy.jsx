import React, { useContext } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import { ShopContext } from '../Context/ShopContext';
import { UserContext } from '../Context/user.context';
import axios from 'axios';



const DummyPayment = (products) => {
    const { user, fetchUser, } = useContext(UserContext);

    const {getTotalCartItems}= useContext(ShopContext);
    async function placeorder() {
        var fetchedUser = "";
      
        if (user) {
          fetchedUser = await fetchUser();
         if (fetchedUser) {
          console.log(fetchedUser)
         }
       }
       const userID = fetchedUser.id
       console.log(userID)
        
          
        
        try{
          
            await axios.post("http://localhost:8000/placeorder/", {userID, 
            })
            .then(res=> {
              console.log("res")
          })
          .catch(e => {
              alert(e)
          })
          
        }
        catch(e){
            console.log(e)
        }
        await             getTotalCartItems(userID)
    
      }
    return (
    <MDBContainer fluid className="py-5" >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard className="rounded-3">
            <MDBCardBody className="mx-1 my-2">
              <div className="d-flex align-items-center">
                <div>
                  <MDBIcon
                    fab
                    icon="cc-visa"
                    size="4x"
                    className="text-black pe-3"
                  />
                </div>
                <div>
                  <p className="d-flex flex-column mb-0">
                    <b>Martina Thomas</b>
                    <span className="small text-muted">**** 8880</span>
                  </p>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex flex-row pb-3">
                  <div
                    className="rounded border border-primary border-2 d-flex w-100 p-3 align-items-center"
                    style={{ backgroundColor: "rgba(18, 101, 241, 0.07)" }}
                  >
                    <div className="d-flex align-items-center pe-3">
                      <MDBRadio
                        name="radioNoLabelX"
                        id="radioNoLabel11"
                        defaultChecked
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-1 small text-primary">
                        Total amount due
                      </p>
                      <h6 className="mb-0 text-primary">{products.price}</h6>
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="d-flex justify-content-between align-items-center pb-1">
                <a href="#!" className="text-muted">
                  Go back
                </a>
                <MDBBtn size="lg" onClick={placeorder}>Place Order</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default DummyPayment
