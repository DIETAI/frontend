import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";

//components
import NotFoundPage from "pages/error/notFound/NotFound.page";
import AuthLayout from "layout/auth/auth.layout";
import { Login, Register } from "pages/auth";
import EmailVerify from "pages/verify/email/emailVerify.page";
import EmailSuccess from "pages/verify/email/emailSuccess.page";
import RoleVerify from "pages/verify/role/roleVerify.page";
import VerifyLayout from "layout/verify/verify.layout";
import SubscriptionPlans from "pages/subscriptionPlans/SubscriptionPlans.page";
import SubscriptionPlansLayout from "layout/subscriptionPlans/subscriptionPlans.layout";
import DashboardLayout from "layout/dashboard/dashboard.layout";
import Home from "pages/dashboard/home/Home.page";
import DieteticAccountLayout from "layout/dashboard/dieteticLayout/accountLayout/DieteticAccount.layout";
import { Messages, Payments, Plans, Profile } from "pages/dashboard/account";
import {
  AllProducts,
  EditProduct,
  NewProduct,
  Product,
} from "pages/dashboard/products";
import {
  AllClients,
  Client,
  EditClient,
  NewClient,
} from "pages/dashboard/clients";
import {
  AllDinners,
  Dinner,
  EditDinner,
  NewDinner,
} from "pages/dashboard/dinners";
import {
  AllMeasurements,
  NewMeasurement,
  EditMeasurement,
  Measurement,
} from "pages/dashboard/measurements";
import {
  AllDietEstablishments,
  DietEstablishment,
  EditDietEstablishment,
  NewDietEstablishment,
} from "pages/dashboard/dietEstablishments";
import { AllDiets, Diet, EditDiet, NewDiet } from "pages/dashboard/diets";
import AdminSubscriptionPlansLayout from "layout/dashboard/adminLayout/subscriptionPlansLayout/AdminSubscriptionPlans.layout";
import {
  AllSubscriptionPlans,
  EditSubscriptionPlan,
  NewSubscriptionPlan,
  SubscriptionPlan,
} from "pages/dashboard/subscriptionPlans";
import AdminDietKindsLayout from "layout/dashboard/adminLayout/dietKindsLayout/AdminDietKinds.layout";
import {
  AllDietKinds,
  DietKind,
  EditDietKind,
  NewDietKind,
} from "pages/dashboard/dietKinds";
import { Navigate } from "react-router";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route index element={<Navigate to="/auth/login" />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="verify" element={<VerifyLayout />}>
        <Route path="email" element={<EmailVerify />} />
        <Route path="email-success" element={<EmailSuccess />} />
        <Route path="role" element={<RoleVerify />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="subscription-plans" element={<SubscriptionPlansLayout />}>
        <Route path="" element={<SubscriptionPlans />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Outlet />}>
          <Route path="home" element={<Outlet />}>
            <Route path="" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="account" element={<DieteticAccountLayout />}>
            <Route path="" element={<Profile />} />
            <Route path="payments" element={<Payments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="plans" element={<Plans />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="products" element={<Outlet />}>
            <Route path="" element={<AllProducts />} />
            <Route path="new" element={<NewProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />
            <Route path=":productId" element={<Product />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="clients" element={<Outlet />}>
            <Route path="" element={<AllClients />} />
            <Route path="new" element={<NewClient />} />
            <Route path="edit/:clientId" element={<EditClient />} />
            <Route path=":clientId" element={<Client />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="dinners" element={<Outlet />}>
            <Route path="" element={<AllDinners />} />
            <Route path="new" element={<NewDinner />} />
            <Route path="edit/:dinnerId" element={<EditDinner />} />
            <Route path=":dinnerId" element={<Dinner />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="measurements" element={<Outlet />}>
            <Route path="" element={<AllMeasurements />} />
            <Route path="new" element={<NewMeasurement />} />
            <Route
              path="edit/:measurementEditId"
              element={<EditMeasurement />}
            />
            <Route path=":measurementId" element={<Measurement />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="diet-establishments" element={<Outlet />}>
            <Route path="" element={<AllDietEstablishments />} />
            <Route path="new" element={<NewDietEstablishment />} />
            <Route
              path="edit/:dietEstablishmentId"
              element={<EditDietEstablishment />}
            />
            <Route
              path=":dietEstablishmentId"
              element={<DietEstablishment />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="diets" element={<Outlet />}>
            <Route path="" element={<AllDiets />} />
            <Route path="new" element={<NewDiet />} />
            <Route path="edit/:dietEditId" element={<EditDiet />} />
            <Route path=":dietId" element={<Diet />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<Outlet />}>
          <Route
            path="subscriptionPlans"
            element={<AdminSubscriptionPlansLayout />}
          >
            <Route path="" element={<AllSubscriptionPlans />} />
            <Route path="new" element={<NewSubscriptionPlan />} />
            <Route
              path="edit/:subscriptionPlanId"
              element={<EditSubscriptionPlan />}
            />
            <Route path=":subscriptionPlanId" element={<SubscriptionPlan />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="dietKinds" element={<AdminDietKindsLayout />}>
            <Route path="" element={<AllDietKinds />} />
            <Route path="new" element={<NewDietKind />} />
            <Route path="edit/:dietKindId" element={<EditDietKind />} />
            <Route path=":dietKindId" element={<DietKind />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
