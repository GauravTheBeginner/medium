import Auth from "../components/Auth"
import Quote from "../components/Quote"

function Signin() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2">
      <div>
      <Auth type="Signin"/>
      </div>
      <div className="  hidden lg:block">
         <Quote/>
      </div>
    </div>
  )
}

export default Signin