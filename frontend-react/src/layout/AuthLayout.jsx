import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100 justify-content-center align-items-center">

        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                TaskFlow 🚀
              </h2>

              <Outlet />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;