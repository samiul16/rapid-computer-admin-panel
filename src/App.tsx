/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";

// countries
import CountryPage from "./pages/Country/CountriesPage";
import CountryDetails from "./pages/Country/CountryDetails";
import CountryNewPage from "./pages/Country/CountryPage";
import CountryFormPage from "./pages/Country/CreatePage";

// users
import UserPage from "./pages/users/UsersPage";
import UserDetailsPage from "./pages/users/UsersDetails";
import UserCreatePage from "./pages/users/CreatePage";
import UserEditPage from "./pages/users/EditPage";

// user master
import UserMasterPage from "./pages/user-master/UsersMasterPage";
import UserMasterDetails from "./pages/user-master/UsersMasterDetails";
import UserMasterCreatePage from "./pages/user-master/CreatePage";
import UserMasterEditPage from "./pages/user-master/EditPage";

// cities
import CityPage from "./pages/city/CitiesPage";
import CityForm from "./pages/city/CreateEditPage";

// states
import StateForm from "./pages/states/CreatePage";
import StateDetails from "./pages/states/StateDetailsPage";
import StatesPage from "./pages/states/StatesPage";
// import AreaPage from "./pages/area/AreaDataTable";
import AreaDetails from "./pages/area/AreaDetailsPage";
import AreasPage from "./pages/area/AreasPage";
import CreatePage from "./pages/area/CreatePage";
import AreaEditPage from "./pages/area/EditPage";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CitiesDetails from "./pages/city/CitiesDetails";
import EditPage from "./pages/Country/EditPage";
import StateEditPage from "./pages/states/EditPage";

// Department Components
import DepartmentCreatePage from "./pages/department/CreatePage";
import DepartmentDetails from "./pages/department/DepartmentDetailsPage";
import DepartmentPage from "./pages/department/DepartmentPage";
import DepartmentEditPage from "./pages/department/EditPage";

// Currencies Components
import CurrenciesDetails from "./pages/currencies/CurrenciesDetails";
import CurrenciesHome from "./pages/currencies/CurrenciesHome";
import CurrencyCreatePage from "./pages/currencies/CurrencyCreatePage";

// Designation Components
import DesignationCreatePage from "./pages/designation/CreatePage";
import DesignationDetails from "./pages/designation/DesignationDetailspage";
import DesignationPage from "./pages/designation/Designationpage";
import DesignationEditPage from "./pages/designation/EditPage";

// Employee Components
import EmployeeCreatePage from "./pages/employee/CreatePage";
import EmployeeEditPage from "./pages/employee/EditPage";
import EmployeeDetails from "./pages/employee/EmployeeDetailsPage";
import EmployeePage from "./pages/employee/EmployeePage";

// Companies Components
import CompaniesDetails from "./pages/companies/CompaniesDetails";
import CompaniesPage from "./pages/companies/CompaniesPage";
import CompaniesCreatePage from "./pages/companies/CreatePage";
import CompaniesEditPage from "./pages/companies/EditPage";

import BranchesDetails from "./pages/branches/Branchesdetails";
import BranchesPage from "./pages/branches/BranchesPage";
import BranchesCreatePage from "./pages/branches/CreatePage";
import BranchesEditPage from "./pages/branches/EditPage";

// Table Components
import TableCreatePage from "./pages/table/CreatePage";
import TableEditPage from "./pages/table/EditPage";
import TableDetails from "./pages/table/TableDetails";
import TablePage from "./pages/table/TablePage";

// UoMs Components
import UoMsCreatePage from "./pages/uoms/CreatePage";
import UoMsEditPage from "./pages/uoms/EditPage";
import UoMsDetails from "./pages/uoms/UoMsDetails";
import UoMsPage from "./pages/uoms/UoMsPage";

// customers
import CustomerCreatePage from "./pages/customers/CustomerCreatePage";
import CustomerDetails from "./pages/customers/CustomerDetails";
import CustomerEditPage from "./pages/customers/CustomersEditPage";
import CustomersPage from "./pages/customers/CustomersPage";

// Suppliers
import SuppliersCreatePage from "./pages/suppliers/CreatePage";
import SuppliersDetails from "./pages/suppliers/SuppliersDetails";
import SuppliersEditPage from "./pages/suppliers/EditPage";
import SuppliersPage from "./pages/suppliers/SuppliersPage";

// holidays
import HolidayPage from "./pages/Holiday/HolidayPage";
import HolidayDetailsPage from "./pages/Holiday/HolidayDetailsPage";
import HolidayEditPage from "./pages/Holiday/EditPage";
import HolidayFormPage from "./pages/Holiday/CreatePage";

// increments
import IncrementsPage from "./pages/Increments/IncrementsPage";
import IncrementsFormPage from "./pages/Increments/CreatePage";
import IncrementsEditPage from "./pages/Increments/EditPage";
import IncrementsDetailsPage from "./pages/Increments/IncrementsDetailsPage";

// retirement
import RetirementPage from "./pages/Retirement/RetirementPage";
import RetirementDetailsPage from "./pages/Retirement/RetirementDetailsPage";
import RetirementEditPage from "./pages/Retirement/EditPage";
import RetirementFormPage from "./pages/Retirement/CreatePage";

// Waiters
import WaitersCreatePage from "./pages/waiters/WaitersCreatePage";
import WaitersDetails from "./pages/waiters/WaitersDetails";
import WaitersEditPage from "./pages/waiters/WaitersEditPage";
import WaitersPage from "./pages/waiters/WaitersPage";

// Table Assigns
import TableAssignsCreatePage from "./pages/table-assigns/TableAssignsCreatePage";
import TableAssignsDetails from "./pages/table-assigns/TableAssignsDetails";
import TableAssignsEditPage from "./pages/table-assigns/TableAssignsEditPage";
import TableAssignsPage from "./pages/table-assigns/TableAssignsPage";

// Reservation
import ReservationCreatePage from "./pages/reservation/ReservationCreatePage";
import ReservationDetails from "./pages/reservation/ReservationDetails";
import ReservationEditPage from "./pages/reservation/ReservationEditPage";
import ReservationPage from "./pages/reservation/ReservationPage";

// Item Components
import ItemCreatePage from "./pages/item/CreatePage";
import ItemEditPage from "./pages/item/EditPage";
import ItemDetails from "./pages/item/ItemDeatils";
import ItemPage from "./pages/item/ItemPage";

// Bank Components
import BankDetails from "./pages/bank/BankDetails";
import BankPage from "./pages/bank/BankPage";
import BankCreatePage from "./pages/bank/CreatePage";
import BankEditPage from "./pages/bank/EditPage";

// Tax Components
import TaxCreatePage from "./pages/tax/CreatePage";
import TaxEditPage from "./pages/tax/EditPage";
import TaxDetails from "./pages/tax/TaxDetails";
import TaxPage from "./pages/tax/TaxPage";

// Brand
import BrandCreatePage from "./pages/brands/BrandCreatePage";
import BrandDetails from "./pages/brands/BrandDetails";
import BrandEditPage from "./pages/brands/BrandEditPage";
import BrandPage from "./pages/brands/BrandPage";

// Deliverymen
import DeliverymenCreatePage from "./pages/deliverymen/DeliverymenCreatePage";
import DeliverymenDetails from "./pages/deliverymen/DeliverymenDetails";
import DeliverymenEditPage from "./pages/deliverymen/DeliverymenEditPage";
import DeliverymenPage from "./pages/deliverymen/DeliverymenPage";

// Order Type
import OrderTypeCreatePage from "./pages/order-type/OrderTypeCreatePage";
import OrderTypeDetails from "./pages/order-type/OrderTypeDetails";
import OrderTypeEditPage from "./pages/order-type/OrderTypeEditPage";
import OrderTypePage from "./pages/order-type/OrderTypePage";

// Store
import StoreCreatePage from "./pages/store/CreatePage";
import StoreEditPage from "./pages/store/EditPage";
import StoreDetails from "./pages/store/StoreDetails";
import StorePage from "./pages/store/StorePage";

// Colors
import ColorsCreatePage from "./pages/colors/ColorsCreatePage";
import ColorsDetails from "./pages/colors/ColorsDetails";
import ColorsEditPage from "./pages/colors/ColorsEditPage";
import ColorsPage from "./pages/colors/ColorsPage";

// Sizes
import SizesCreatePage from "./pages/sizes/SizesCreatePage";
import SizesDetails from "./pages/sizes/SizesDetails";
import SizesEditPage from "./pages/sizes/SizesEditPage";
import SizesPage from "./pages/sizes/SizesPage";

// Warehouse
import WarehouseCreatePage from "./pages/warehouse/WarehouseCreatePage";
import WarehouseDetails from "./pages/warehouse/WarehouseDetails";
import WarehouseEditPage from "./pages/warehouse/WarehouseEditPage";
import WarehousePage from "./pages/warehouse/WarehousePage";

// Groups
import GroupsCreatePage from "./pages/groups/GroupsCreatePage";
import GroupsDetails from "./pages/groups/GroupsDetails";
import GroupsEditPage from "./pages/groups/GroupsEditPage";
import GroupsPage from "./pages/groups/GroupsPage";

// Divisions
import DivisionsCreatePage from "./pages/divisions/DivisionsCreatePage";
import DivisionsDetails from "./pages/divisions/DivisionsDetails";
import DivisionsEditPage from "./pages/divisions/DivisionsEditPage";
import DivisionsPage from "./pages/divisions/DivisionsPage";

// Sections
import SectionsCreatePage from "./pages/sections/SectionsCreatePage";
import SectionsDetails from "./pages/sections/SectionsDetails";
import SectionsEditPage from "./pages/sections/SectionsEditPage";
import SectionsPage from "./pages/sections/SectionsPage";

// Suppliers Groups
import SuppliersGroupsCreatePage from "./pages/suppliers-group/SuppliersCreatePage";
import SuppliersGroupsDetails from "./pages/suppliers-group/SuppliersDetails";
import SuppliersGroupsEditPage from "./pages/suppliers-group/SuppliersEditPage";
import SuppliersGroupsPage from "./pages/suppliers-group/SuppliersPage";

// Customer Groups
import CustomerGroupsCreatePage from "./pages/customers-group/CustomerCreatePage";
import CustomerGroupsDetails from "./pages/customers-group/CustomerDetails";
import CustomerGroupsEditPage from "./pages/customers-group/CustomersEditPage";
import CustomerGroupsPage from "./pages/customers-group/CustomersPage";

// Payment
import PaymentCreatePage from "./pages/payment/CreatePage";
import PaymentEditPage from "./pages/payment/EditPage";
// import PaymentDetailsPage from "./pages/payment/PaymentDetails";
// import PaymentDetailsPage from "./pages/payment/PaymentDetails";
import PaymentPage from "./pages/payment/PaymentPage";

// Customer Statement
import CustomerStatements from "./pages/customer-statement/Statements";
import CustomerStatementDetails from "./pages/customer-statement/DetailsPage";
import CustomerStatementEditPage from "./pages/customer-statement/EditPage";
import CustomerStatementPage from "./pages/customer-statement/CustomerStatementPage";

// Salesman
import SalesmanCreatePage from "./pages/salesman/CreatePage";
import SalesmanEditPage from "./pages/salesman/EditPage";
import SalesmanDetails from "./pages/salesman/SalesmanDetails";
import SalesmanPage from "./pages/salesman/SalesmanPage";

// Promotion
import PromotionCreatePage from "./pages/promotion/CreatePage";
import PromotionEditPage from "./pages/promotion/EditPage";
import PromotionDetails from "./pages/promotion/PromotionDetails";
import PromotionPage from "./pages/promotion/PromotionPage";

// Shelf
import ShelfCreatePage from "./pages/shelf/ShelfCreatePage";
import ShelfDetails from "./pages/shelf/ShelfDetails";
import ShelfEditPage from "./pages/shelf/ShelfEditPage";
import ShelfPage from "./pages/shelf/ShelfPage";

// Rack
import RackCreatePage from "./pages/rack/RackCreatePage";
import RackDetails from "./pages/rack/RackDetails";
import RackEditPage from "./pages/rack/RackEditPage";
import RackPage from "./pages/rack/RackPage";

// Bin
import BinCreatePage from "./pages/bin/BinCreatePage";
import BinDetails from "./pages/bin/BinDetails";
import BinEditPage from "./pages/bin/BinEditPage";
import BinPage from "./pages/bin/BinPage";

// Sub Bin
import SubBinCreatePage from "./pages/sub-bin/SubBinCreatePage";
import SubBinDetails from "./pages/sub-bin/SubBinDetails";
import SubBinEditPage from "./pages/sub-bin/SubBinEditPage";
import SubBinPage from "./pages/sub-bin/SubBinPage";

// Order
import OrderCreatePage from "./pages/orders/CreatePage";
import OrderEditPage from "./pages/orders/EditPage";
import OrderDetails from "./pages/orders/OrdersDetails";
import OrderPage from "./pages/orders/OrdersPage";

// Invoices
import InvoicesCreatePage from "./pages/invoices/CreatePage";
import InvoicesEditPage from "./pages/invoices/EditPage";
import InvoicesDetails from "./pages/invoices/InvoicesDetails";
import InvoicesPage from "./pages/invoices/InvoicesPage";

// Opening Stock Inventory
import OpeningStockInventoryPage from "./pages/opening-stock-inventory/OpeningStockInventoryPage";
// import OpeningStockInventoryCreatePage from "./pages/opening-stock-inventory/CreatePage";
// import OpeningStockInventoryEditPage from "./pages/opening-stock-inventory/EditPage";
import OpeningStockInventoryCreatePage from "./pages/opening-stock-inventory/CreatePage";
import OpeningStockInventoryEditPage from "./pages/opening-stock-inventory/EditPage";
import OpeningStockInventoryDetails from "./pages/opening-stock-inventory/OpeningInventoryDetails";

// Purchase Returns
import PurchaseReturnsCreatePage from "./pages/purchase-returns/CreatePage";
import PurchaseReturnsEditPage from "./pages/purchase-returns/EditPage";
import PurchaseReturnsDetails from "./pages/purchase-returns/PurchaseReturnsDetails";
import PurchaseReturnsPage from "./pages/purchase-returns/PurchaseReturnsPage";

import StockTransferDetails from "./pages/stock-transfer/StockTransferDetails";
import StockTransferPage from "./pages/stock-transfer/StockTransferPage";

// Stock Transfer
import StockTransferCreatePage from "./pages/stock-transfer/CreatePage";
import StockTransferEditPage from "./pages/stock-transfer/EditPage";

// Delivery Note
import DeliveryNoteCreatePage from "./pages/delivery-note/CreatePage";

// Damage Items
import DamageItemsCreatePage from "./pages/damage-items/CreatePage";
import DamageItemsDetails from "./pages/damage-items/DamageItemsDetails";
import DamageItemsPage from "./pages/damage-items/DamageItemsPage";
import DamageItemsEditPage from "./pages/damage-items/EditPage";

// Expiry Items
import DeliveryNoteDetails from "./pages/delivery-note/DeliveryNoteDetails";
import DeliveryNotePage from "./pages/delivery-note/DeliveryNotesPage";
import ExpiryItemsCreatePage from "./pages/expiry-items/CreatePage";
import ExpiryItemsEditPage from "./pages/expiry-items/EditPage";
import ExpiryItemsDetails from "./pages/expiry-items/ExpiryItemsDetails";
import ExpiryItemsPage from "./pages/expiry-items/ExpiryItemsPage";
// import DeliveryNoteEditPage from "./pages/delivery-note/EditPage";
import DeliveryNoteEditPage2 from "./pages/delivery-note/EditPage2";

// Sales Quotation
import SalesQuotationCreatePage from "./pages/sales-quotation/CreatePage";
import SalesQuotationEditPage from "./pages/sales-quotation/EditPage";
import SalesQuotationDetails from "./pages/sales-quotation/SalesQuotationDetails";
import SalesQuotationPage from "./pages/sales-quotation/SalesQuotationPage";

// Sales Invoice
import SalesCreatePage from "./pages/sales-Invoice/CreatePage";
import SalesEditPage from "./pages/sales-Invoice/EditPage";
import SalesDetails from "./pages/sales-Invoice/SalesDetails";
import SalesPage from "./pages/sales-Invoice/SalesPage";

// Sales Return
import SalesReturnCreatePage from "./pages/sales-return/CreatePage";
import SalesReturnEditPage from "./pages/sales-return/EditPage";
import SalesReturnDetails from "./pages/sales-return/SalesDetails";
import SalesReturnPage from "./pages/sales-return/SalesPage";

import TranslationPage from "./pages/Translation/TranslationPage";
// Permissions
import PermissionsCreatePage from "./pages/permissions/CreatePage";
import PermissionsPage from "./pages/permissions/PermissionsPage";

// Language
import LanguageCreatePage from "./pages/languages/CreatePage";
import LanguageEditPage from "./pages/languages/EditPage";
import LanguageDetails from "./pages/languages/LanguagesDetails";
import LanguagePage from "./pages/languages/LanguagesPage";

// Users Location
import UsersLocationPage from "./pages/user-location/UserLocationPage";

// Activity Log
import ActivityLogPage from "./pages/activity-log/ActivityLogPage";

// Lock Screen
import { useInactivityTimer } from "./hooks/useInactivityTimer";
import { cn } from "./lib/utils";
import { LockScreen } from "./components/common/LockScreen";

// Section
import SectionCreatePage from "./pages/section/CreatePage";
import SectionDetails from "./pages/section/SectionDetails";
import SectionEditPage from "./pages/section/EditPage";
import SectionPage from "./pages/section/SectionPage";
import AssetsMasterDetailsPage from "./pages/Assets-master/AssetsDetails";
import AssetsMasterPage from "./pages/Assets-master/AssetsPage";
import AssetsMasterFormPage from "./pages/Assets-master/CreatePage";
import AssetsMasterEditPage from "./pages/Assets-master/EditPage";
import AssetsDetails from "./pages/Assets/AssetsDetails";
import AssetsPage from "./pages/Assets/AssetsPage";
import AssetsFormPage from "./pages/Assets/CreatePage";
import AssetsEditPage from "./pages/Assets/EditPage";
import RentalFormPage from "./pages/Rental/CreatePage";
import RentalEditPage from "./pages/Rental/EditPage";
import RentalDetailsPage from "./pages/Rental/RentalDetailsPage";
import RentalPage from "./pages/Rental/RentalPage";

// Task Assign
import TaskAssignPage from "./pages/task-assigns/TaskAssignPage";
import TaskAssignCreatePage from "./pages/task-assigns/TaskAssignCreatePage";
import TaskAssignEditPage from "./pages/task-assigns/TaskAssignEditPage";
import TaskAssignDetails from "./pages/task-assigns/TaskAssignDetails";

// Task Category
import TaskCategoryCreatePage from "./pages/task-category/CreatePage";
import TaskCategoryDetails from "./pages/task-category/TaskCategoryDetails";
import TaskCategoryEditPage from "./pages/task-category/EditPage";
import TaskCategoryPage from "./pages/task-category/TaskCategoryPage";

// Sample Category
import SampleCategoryCreatePage from "./pages/sample-category/CreatePage";
import SampleCategoryDetails from "./pages/sample-category/SampleCategoryDetails";
import SampleCategoryEditPage from "./pages/sample-category/EditPage";
import SampleCategoryPage from "./pages/sample-category/SampleCategoryPage";

// Sample Receiving
import SampleReceivingCreatePage from "./pages/sample-receiving/CreatePage";
import SampleReceivingDetails from "./pages/sample-receiving/SampleReceivingDetails";
import SampleReceivingEditPage from "./pages/sample-receiving/EditPage";
import SampleReceivingPage from "./pages/sample-receiving/SampleReceivingPage";

// Projects
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectsCreatePage from "./pages/projects/CreatePage";
import ProjectsEditPage from "./pages/projects/EditPage";
import ProjectsDetails from "./pages/projects/ProjectsDetails";

// Leaves
import LeavesCreatePage from "./pages/leaves/CreatePage";
import LeavesDetails from "./pages/leaves/LeavesDetails";
import LeavesEditPage from "./pages/leaves/EditPage";
import LeavesPage from "./pages/leaves/LeavesPage";

// Appointment
import AppointmentCreatePage from "./pages/appointment/CreatePage";
import AppointmentDetails from "./pages/appointment/AppoinmentDetails";
import AppointmentEditPage from "./pages/appointment/EditPage";
import AppointmentPage from "./pages/appointment/AppoinmentPage";

// Leaves Approval
import LeavesApprovalDetails from "./pages/leaves-approval/LeavesApprovalDetails";
import LeavesApprovalPage from "./pages/leaves-approval/LeavesApprovalPage";
// Project Type
import ProjectTypePage from "./pages/project-type/ProjectTypePage";
import ProjectTypeCreatePage from "./pages/project-type/CreatePage";
import ProjectTypeEditPage from "./pages/project-type/EditPage";
import ProjectTypeDetails from "./pages/project-type/ProjectTypeDetails";

// Leaves Application
import LeavesApplicationPage from "./pages/leaves-application/LeavesApplicationPage";
import LeavesApplicationDetails from "./pages/leaves-application/LeavesApplicationDetails";
import LeavesApplicationCreatePage from "./pages/leaves-application/CreatePage";
import LeavesApplicationEditPage from "./pages/leaves-application/EditPage";
// TimeSheet
import TimeSheetPage from "./pages/timesheet/TimeSheetPage";

// Deductions
import DeductionsPage from "./pages/deductions/DeductionsPage";
import DeductionsCreatePage from "./pages/deductions/CreatePage";
import DeductionsEditPage from "./pages/deductions/EditPage";
import DeductionsDetails from "./pages/deductions/DeductionsDetails";

// Insurances
import InsurancesPage from "./pages/Insurances/InsurancesPage";
import InsurancesCreatePage from "./pages/Insurances/CreatePage";
import InsurancesEditPage from "./pages/Insurances/EditPage";
import InsurancesDetailsPage from "./pages/Insurances/RetirementDetailsPage";

// Certificates
import CertificatesPage from "./pages/Certificates/CertificatesPage";
import CertificatesDetailsPage from "./pages/Certificates/CertificatesDetailsPage";
import CertificatesCreatePage from "./pages/Certificates/CreatePage";
import CertificatesEditPage from "./pages/Certificates/EditPage";
import FinancialYearPage from "./pages/FinancialYear/FinancialYearPage";
import FinancialYearDetailsPage from "./pages/FinancialYear/FinancialYearDetailsPage";
import FinancialYearEditPage from "./pages/FinancialYear/EditPage";
import FinancialYearCreatePage from "./pages/FinancialYear/CreatePage";

import SalaryAdvanceDetails from "./pages/salary-advance/SalaryAdvanceDetails";
import SalaryAdvancePage from "./pages/salary-advance/SalaryAdvancePage";
import SalaryAdvanceCreatePage from "./pages/salary-advance/CreatePage";
import SalaryAdvanceEditPage from "./pages/salary-advance/EditPage";

import BonusPage from "./pages/bonus/BonusesPage";
import BonusDetails from "./pages/bonus/BonusesDetails";
import BonusCreatePage from "./pages/bonus/CreatePage";
import BonusEditPage from "./pages/bonus/EditPage";

// Termination
import TerminationPage from "./pages/termination/TerminationPage";
import TerminationDetails from "./pages/termination/TerminationDetails";
import TerminationCreatePage from "./pages/termination/CreatePage";
import TerminationEditPage from "./pages/termination/EditPage";
// Allowances
import AllowancesPage from "./pages/allowances/AllowancesPage";
import AllowancesCreatePage from "./pages/allowances/CreatePage";
import AllowancesEditPage from "./pages/allowances/EditPage";
import AllowancesDetails from "./pages/allowances/AllowancesDetails";

// Loans
import LoansPage from "./pages/loans/LoansPage";
import LoansCreatePage from "./pages/loans/CreatePage";
import LoansEditPage from "./pages/loans/EditPage";
import LoansDetails from "./pages/loans/LoansDetails";

// Transfer
import TransferPage from "./pages/transfer/TransferPage";
import TransferDetails from "./pages/transfer/TransferDetails";
import TransferCreatePage from "./pages/transfer/CreatePage";
import TransferEditPage from "./pages/transfer/EditPage";

// tax-rates
import TaxRatesPage from "./pages/TaxRates/TaxRatesPage";
import TaxRatesDetailsPage from "./pages/TaxRates/TaxRatesDetailsPage";
import TaxRatesCreatePage from "./pages/TaxRates/CreatePage";
import TaxRatesEditPage from "./pages/TaxRates/EditPage";

// Database
import DataabsePage from "./pages/database/DataabsePage";

// Terms
import TermsPage from "./pages/terms/TermsPage";
import TermsCreatePage from "./pages/terms/CreatePage";
import TermsEditPage from "./pages/terms/EditPage";
import TermsDetails from "./pages/terms/TermsDetails";

// Cash
import CashPage from "./pages/cash/CashPage";
import CashCreatePage from "./pages/cash/CreatePage";
import CashEditPage from "./pages/cash/EditPage";
import CashDetails from "./pages/cash/CashDetails";

// Interview
import InterviewPage from "./pages/Interview/InterviewsPage";
import InterviewCreatePage from "./pages/Interview/CreatePage";
import InterviewEditPage from "./pages/Interview/EditPage";
import InterviewDetails from "./pages/Interview/InterviewsDetails";

// Contact Type
import ContactTypePage from "./pages/contact-type/ContactTypePage";
import ContactTypeCreatePage from "./pages/contact-type/CreatePage";
import ContactTypeEditPage from "./pages/contact-type/EditPage";
import ContactTypeDetails from "./pages/contact-type/ContactTypeDetails";
// Candidate Shortlists
import CandidateSortlistsPage from "./pages/candidate-sortlists/CandidateSortlistsPage";
import CandidateSortlistsCreatePage from "./pages/candidate-sortlists/CreatePage";
import CandidateSortlistsEditPage from "./pages/candidate-sortlists/EditPage";
import CandidateSortlistsDetails from "./pages/candidate-sortlists/DetailsPage";

// Blood Groups
import BloodGroupsPage from "./pages/blood-groups/BloodGroupsPage";
import BloodGroupsCreatePage from "./pages/blood-groups/CreatePage";
import BloodGroupsEditPage from "./pages/blood-groups/EditPage";
import BloodGroupsDetails from "./pages/blood-groups/DetailsPage";

// Unavailable Dates
import UnavailableDatesPage from "./pages/unavailable-dates/UnavailableDatesPage";
import UnavailableDatesCreatePage from "./pages/unavailable-dates/CreatePage";
import UnavailableDatesEditPage from "./pages/unavailable-dates/EditPage";
import UnavailableDatesDetails from "./pages/unavailable-dates/DetailsPage";

// Job Locations
import JobLocationsPage from "./pages/job-locations/JobLocationsPage";
import JobLocationsCreatePage from "./pages/job-locations/CreatePage";
import JobLocationsEditPage from "./pages/job-locations/EditPage";
import JobLocationsDetails from "./pages/job-locations/DetailsPage";

// Expenses
import ExpensesPage from "./pages/expenses/ExpensesPage";
import ExpensesCreatePage from "./pages/expenses/CreatePage";
import ExpensesEditPage from "./pages/expenses/EditPage";
import ExpensesDetails from "./pages/expenses/DetailsPage";

// Candidate List
import CandidateListPage from "./pages/CandidateList/CandidateListPage";
import CandidateListDetailsPage from "./pages/CandidateList/CandidateListDetailsPage";
import CandidateListCreatePage from "./pages/CandidateList/CreatePage";
import CandidateListEditPage from "./pages/CandidateList/EditPage";

// Candidate Selection
import CandidateSelectionsPage from "./pages/CandidateSelections/CandidateSelectionsPage";
import CandidateSelectionsDetailsPage from "./pages/CandidateSelections/CandidateSelectionsDetailsPage";
import CandidateSelectionsCreatePage from "./pages/CandidateSelections/CreatePage";
import CandidateSelectionsEditPage from "./pages/CandidateSelections/EditPage";

// Commission
import CommissionPage from "./pages/Commission/CommissionPage";
import CommissionDetailsPage from "./pages/Commission/CommissionDetailsPage";
import CommissionCreatePage from "./pages/Commission/CreatePage";
import CommissionEditPage from "./pages/Commission/EditPage";

// Leads
import LeadsPage from "./pages/new-leads/LeadsPage";
import LeadsDetailsPage from "./pages/new-leads/LeadsDetailsPage";
import LeadsEditPage from "./pages/new-leads/EditPage";
import LeadsCreatePage from "./pages/new-leads/CreatePage";

// Leads
import NewLeadsPage from "./pages/leads/LeadsPage";
import NewLeadsDetailsPage from "./pages/leads/LeadsDetails";
import NewLeadsEditPage from "./pages/leads/EditPage";
import NewLeadsCreatePage from "./pages/leads/CreatePage";

// Booking Type
import BookingTypePage from "./pages/BookingType/BookingTypePage";
import BookingTypeDetailsPage from "./pages/BookingType/BookingTypeDetailsPage";
import BookingTypeCreatePage from "./pages/BookingType/CreatePage";
import BookingTypeEditPage from "./pages/BookingType/EditPage";

// Rooms
import RoomsPage from "./pages/Rooms/RoomsPage";
import RoomsDetailsPage from "./pages/Rooms/RoomsDetailsPage";
import RoomsEditPage from "./pages/Rooms/EditPage";
import RoomsCreatePage from "./pages/Rooms/CreatePage";

// Employee Contract
import EmployeeContractPage from "./pages/employee-contract/EmployeeContractPage";
import EmployeeContractCreatePage from "./pages/employee-contract/CreatePage";
import EmployeeContractEditPage from "./pages/employee-contract/EditPage";
import EmployeeContractDetails from "./pages/employee-contract/EmployeeContractDetails";

// Weekly Holidays
import WeeklyHolidaysPage from "./pages/weekly-holidays/WeeklyHolidaysPage";
import WeeklyHolidaysCreatePage from "./pages/weekly-holidays/CreatePage";
import WeeklyHolidaysEditPage from "./pages/weekly-holidays/EditPage";
import WeeklyHolidaysDetails from "./pages/weekly-holidays/WeeklyHolidaysDetails";

// Lead Sources
import LeadSourcesPage from "./pages/lead-sources/LeadSourcesPage";
import LeadSourcesCreatePage from "./pages/lead-sources/CreatePage";
import LeadSourcesEditPage from "./pages/lead-sources/EditPage";
import LeadSourcesDetails from "./pages/lead-sources/LeadSourcesDetails";

// Lead Status
import LeadStatusPage from "./pages/lead-status/LeadStatusPage";
import LeadStatusCreatePage from "./pages/lead-status/CreatePage";
import LeadStatusEditPage from "./pages/lead-status/EditPage";
import LeadStatusDetails from "./pages/lead-status/LeadStatusDetails";

// Skills
import SkillsPage from "./pages/skills/SkillsPage";
import SkillsCreatePage from "./pages/skills/CreatePage";
import SkillsEditPage from "./pages/skills/EditPage";
import SkillsDetails from "./pages/skills/SkillsDetails";
import RoomSizePage from "./pages/RoomSize/RoomSizePage";
import RoomSizeDetailsPage from "./pages/RoomSize/RoomSizeDetailsPage";
import RoomSizeEditPage from "./pages/RoomSize/EditPage";
import RoomSizeCreatePage from "./pages/RoomSize/CreatePage";

// House Keepers
import HouseKeepersPage from "./pages/house-keepers/HouseKeepersPage";
import HouseKeepersCreatePage from "./pages/house-keepers/CreatePage";
import HouseKeepersEditPage from "./pages/house-keepers/EditPage";
import HouseKeepersDetails from "./pages/house-keepers/HouseKeepersDetails";

// Assign House Keepers
import AssignHouseKeepersPage from "./pages/assign-house-keepers/HouseKeepersPage";
import AssignHouseKeepersCreatePage from "./pages/assign-house-keepers/CreatePage";
import AssignHouseKeepersEditPage from "./pages/assign-house-keepers/EditPage";
import AssignHouseKeepersDetails from "./pages/assign-house-keepers/HouseKeepersDetails";

// Benefit Penalty
import BenefitPenaltyPage from "./pages/benefit-penalty/BenefitPenaltyPage";
import BenefitPenaltyCreatePage from "./pages/benefit-penalty/CreatePage";
import BenefitPenaltyEditPage from "./pages/benefit-penalty/EditPage";
import BenefitPenaltyDetails from "./pages/benefit-penalty/BenefitPenaltyDetails";

// Maintenaces
import MaintenacesPage from "./pages/maintenances/MaintenacesPage";
import MaintenacesCreatePage from "./pages/maintenances/CreatePage";
import MaintenacesEditPage from "./pages/maintenances/EditPage";
import MaintenacesDetails from "./pages/maintenances/MaintenacesDetails";

// Icons
import IconsCreatePage from "./pages/icons/CreatePage";

// Chart of Accounts
import ChartOfAccountsPage from "./pages/chart-of-accounts/ChartOfAccountsPage";

// Tenant
import TenantPage from "./pages/tenant/TenantPage";

// Property
import PropertyPage from "./pages/properties/PropertyPage";
import PropertyCreatePage from "./pages/properties/CreatePage";
import PropertyEditPage from "./pages/properties/EditPage";
import PropertyDetails from "./pages/properties/DetailsPage";

// Property Approval
import PropertyApprovalPage from "./pages/property-approval/PropertyApprovalPage";
import PropertyApprovalCreatePage from "./pages/property-approval/CreatePage";
import PropertyApprovalEditPage from "./pages/property-approval/EditPage";
import PropertyApprovalDetails from "./pages/property-approval/DetailsPage";

// Vehicles
import VehiclesPage from "./pages/vehicles/VehiclesPage";
import VehiclesCreatePage from "./pages/vehicles/CreatePage";
import VehiclesEditPage from "./pages/vehicles/EditPage";
import VehiclesDetails from "./pages/vehicles/DetailsPage";

// Fuels
import FuelsPage from "./pages/fuels/FuelsPage";
import FuelsCreatePage from "./pages/fuels/CreatePage";
import FuelsEditPage from "./pages/fuels/EditPage";
import FuelsDetails from "./pages/fuels/DetailsPage";

// Parts
import PartsPage from "./pages/parts/PartsPage";
import PartsCreatePage from "./pages/parts/CreatePage";
import PartsEditPage from "./pages/parts/EditPage";
import PartsDetails from "./pages/parts/DetailsPage";

// Rental Requests
import RentalRequestsPage from "./pages/rental-requests/RentalRequestsPage";
import RentalRequestsCreatePage from "./pages/rental-requests/CreatePage";
import RentalRequestsEditPage from "./pages/rental-requests/EditPage";
import RentalRequestsDetails from "./pages/rental-requests/DetailsPage";

// Devices
import DevicesPage from "./pages/devices/DevicesPage";
import DevicesCreatePage from "./pages/devices/CreatePage";
import DevicesEditPage from "./pages/devices/EditPage";
import DevicesDetails from "./pages/devices/DevicesDetails";

// Repair Jobs
import RepairJobsPage from "./pages/repair-jobs/RepairJobsPage";
import RepairJobsCreatePage from "./pages/repair-jobs/CreatePage";
import RepairJobsEditPage from "./pages/repair-jobs/EditPage";
import RepairJobsDetails from "./pages/repair-jobs/RepairJobsDetails";

// Log Books
import LogBooksPage from "./pages/LogBooks/LogBooksPage";
import LogBooksDetailsPage from "./pages/LogBooks/LogBooksDetailsPage";
import LogBooksEditPage from "./pages/LogBooks/EditPage";
import LogBooksCreatePage from "./pages/LogBooks/CreatePage";

// Drivers
import DriversPage from "./pages/Drivers/DriversPage";
import DriversCreatePage from "./pages/Drivers/CreatePage";
import DriversEditPage from "./pages/Drivers/EditPage";
import DriversDetailsPage from "./pages/Drivers/DriversDetailsPage";

// Real Estate Agents
import RealEstateAgentPage from "./pages/RealestateAgent/RealEstateAgentPage";
import RealEstateAgentCreatePage from "./pages/RealestateAgent/CreatePage";
import RealEstateAgentDetails from "./pages/RealestateAgent/DetailsPage";
import RealEstateAgentEditPage from "./pages/RealestateAgent/EditPage";

// Property Owner
import PropertyOwnerPage from "./pages/property-owner/PropertyOwnerPage";
import PropertyOwnerCreatePage from "./pages/property-owner/CreatePage";
import PropertyOwnerEditPage from "./pages/property-owner/EditPage";
import PropertyOwnerDetails from "./pages/property-owner/DetailsPage";
import BusinessBrokerPage from "./pages/BusinessBroker/BusinessBrokerPage";
import BusinessBrokerDetails from "./pages/BusinessBroker/DetailsPage";
import BusinessBrokerCreatePage from "./pages/BusinessBroker/CreatePage";
import BusinessBrokerEditPage from "./pages/BusinessBroker/EditPage";
import ShipmentPage from "./pages/Shipment/ShipmentPage";
import ShipmentDetails from "./pages/Shipment/DetailsPage";
import ShipmentEditPage from "./pages/Shipment/EditPage";
import ShipmentCreatePage from "./pages/Shipment/CreatePage";

// Depreciations
import DepreciationsPage from "./pages/Depreciations/DepreciationsPage";

// Tasks
import TasksPage from "./pages/tasks/TasksPage";
import TasksCreatePage from "./pages/tasks/CreatePage";
import TasksEditPage from "./pages/tasks/EditPage";
import TasksDetails from "./pages/tasks/TasksDetails";

// Shift Type
import ShiftTypePage from "./pages/shift-type/ShiftTypePage";
import ShiftTypeCreatePage from "./pages/shift-type/CreatePage";
import ShiftTypeEditPage from "./pages/shift-type/EditPage";
import ShiftTypeDetails from "./pages/shift-type/ShiftTypeDetails";

// Onboarding
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import OnboardingCreatePage from "./pages/onboarding/CreatePage";
import OnboardingEditPage from "./pages/onboarding/EditPage";
import OnboardingDetails from "./pages/onboarding/OnboardingDetails";
import JournalEntryPage from "./pages/JournalEntry/JournalEntryPage";
import JournalEntryDetails from "./pages/JournalEntry/DetailsPage";
import JournalEntryCreatePage from "./pages/JournalEntry/CreatePage";
import JournalEntryEditPage from "./pages/JournalEntry/EditPage";
import PickupPage from "./pages/Pickup/PickupPage";
import PickupDetails from "./pages/Pickup/DetailsPage";
import PickupCreatePage from "./pages/Pickup/CreatePage";
import PickupEditPage from "./pages/Pickup/EditPage";
import TransportMasterFormPage from "./pages/TransportMaster/CreatePage";
import TransportMasterEditPage from "./pages/TransportMaster/EditPage";
import TransportMasterPage from "./pages/TransportMaster/TransportMasterPage";
import TransportMasterDetailsPage from "./pages/TransportMaster/DetailsPage";

// Inspections
import InspectionsPage from "./pages/inspections/InspectionsPage";
import InspectionsCreatePage from "./pages/inspections/CreatePage";
import InspectionsEditPage from "./pages/inspections/EditPage";
import InspectionsDetails from "./pages/inspections/InspectionsDetails";

// Checks
import ChecksPage from "./pages/checks/ChecksPage";
import ChecksCreatePage from "./pages/checks/CreatePage";
import ChecksEditPage from "./pages/checks/EditPage";
import ChecksDetails from "./pages/checks/ChecksDetails";

// Supplier Master
import SupplierMasterPage from "./pages/SupplierMaster/SupplierMasterPage";
import SupplierMasterDetailsPage from "./pages/SupplierMaster/DetailsPage";
import SupplierMasterFormPage from "./pages/SupplierMaster/CreatePage";
import SupplierMasterEditPage from "./pages/SupplierMaster/EditPage";

// Port Master
import PortMasterPage from "./pages/port-master/PortMasterPage";
import PortMasterCreatePage from "./pages/port-master/CreatePage";
import PortMasterEditPage from "./pages/port-master/EditPage";
import PortMasterDetails from "./pages/port-master/PortMasterDetails";

// Agent Master
import AgentMasterPage from "./pages/agent-master/AgentMasterPage";
import AgentMasterCreatePage from "./pages/agent-master/CreatePage";
import AgentMasterEditPage from "./pages/agent-master/EditPage";
import AgentMasterDetails from "./pages/agent-master/AgentMasterDetails";

// User Log
import UserLogPage from "./pages/UserLog/UserLogPage";
import PendingOrderPage from "./pages/PendingOrder/PendingOrderPage";

// Consignee Master
import ConsigneeMasterPage from "./pages/consignee-master/ConsigneeMasterPage";
import ConsigneeMasterCreatePage from "./pages/consignee-master/CreatePage";
import ConsigneeMasterEditPage from "./pages/consignee-master/EditPage";
import ConsigneeMasterDetails from "./pages/consignee-master/ConsigneeMasterDetails";

// Transit Order
import TransitOrderPage from "./pages/transit-order/TransitOrderPage";
import TransitOrderCreatePage from "./pages/transit-order/CreatePage";
import TransitOrderEditPage from "./pages/transit-order/EditPage";
import TransitOrderDetails from "./pages/transit-order/TransitOrderDetails";

// Purchase Order Logistic
import PurchaseOrderLogisticPage from "./pages/purchase-order-logistic/PurchaseOrderLogisticPage";
import PurchaseOrderLogisticCreatePage from "./pages/purchase-order-logistic/CreatePage";
import PurchaseOrderLogisticEditPage from "./pages/purchase-order-logistic/EditPage";
import PurchaseOrderLogisticDetails from "./pages/purchase-order-logistic/PurchaseOrderLogisticDetails";

// Transporter
import TransporterPage from "./pages/transporter/TransporterPage";
import TransporterCreatePage from "./pages/transporter/CreatePage";
import TransporterEditPage from "./pages/transporter/EditPage";
import TransporterDetails from "./pages/transporter/TransporterDetails";
import LogisticWarehousePage from "./pages/logisticWareHouse/LogisticWarehousePage";
import LogisticWarehouseDetailsPage from "./pages/logisticWareHouse/DetailsPage";
import LogisticWarehouseEditPage from "./pages/logisticWareHouse/EditPage";
import LogisticWarehouseCreatePage from "./pages/logisticWareHouse/CreatePage";

// Documents
import DocumentsPage from "./pages/documents/DocumentsPage";
import DocumentsCreatePage from "./pages/documents/CreatePage";
import DocumentsEditPage from "./pages/documents/EditPage";
import DocumentsDetails from "./pages/documents/DetailsPage";

// Goods
import GoodsPage from "./pages/goods/GoodsPage";
import GoodsCreatePage from "./pages/goods/CreatePage";
import GoodsEditPage from "./pages/goods/EditPage";
import GoodsDetails from "./pages/goods/DetailsPage";

// Asset Maintenances
import AssetMaintenancesPage from "./pages/AssetMaintenances/AssetMaintenancesPage";
import AssetMaintenancesCreatePage from "./pages/AssetMaintenances/CreatePage";
import AssetMaintenancesEditPage from "./pages/AssetMaintenances/EditPage";
import AssetMaintenancesDetailsPage from "./pages/AssetMaintenances/DetailsPage";

// Membership Rules
import MembershipRulesPage from "./pages/MembershipRules/MembershipRulesPage";
import MembershipRulesCreatePage from "./pages/MembershipRules/CreatePage";
import MembershipRulesEditPage from "./pages/MembershipRules/EditPage";
import MembershipRulesDetailsPage from "./pages/MembershipRules/DetailsPage";

// Loyalty Users
import LoyaltyUsersPage from "./pages/LoyaltyUsers/LoyaltyUsersPage";

// Loyalty Programs
import LoyaltyProgramsPage from "./pages/LoyaltyPrograms/LoyaltyProgramsPage";
import LoyaltyProgramsDetailsPage from "./pages/LoyaltyPrograms/DetailsPage";
import LoyaltyProgramsCreatePage from "./pages/LoyaltyPrograms/CreatePage";
import LoyaltyProgramsEditPage from "./pages/LoyaltyPrograms/EditPage";

// Manufacturing Orders
import ManufacturingOrdersPage from "./pages/ManufacturingOrders/ManufacturingOrdersPage";
import ManufacturingOrdersCreatePage from "./pages/ManufacturingOrders/CreatePage";
import ManufacturingOrdersDetailsPage from "./pages/ManufacturingOrders/DetailsPage";
import ManufacturingOrdersEditPage from "./pages/ManufacturingOrders/EditPage";

// Courier
import CourierPage from "./pages/courier/CourierPage";
import CourierCreatePage from "./pages/courier/CreatePage";
import CourierEditPage from "./pages/courier/EditPage";
import CourierDetails from "./pages/courier/DetailsPage";
import ReceiveWarehouseLogisticsPage from "./pages/ReceiveWarehouseLogistics/ReceiveWarehouseLogisticsPage";
import ReceiveWarehouseLogisticFormPage from "./pages/ReceiveWarehouseLogistics/CreatePage";
import ReceiveWarehouseLogisticEditPage from "./pages/ReceiveWarehouseLogistics/EditPage";
import ReceiveWarehouseLogisticDetailsPage from "./pages/ReceiveWarehouseLogistics/DetailsPage";

// Arrival Port
import ArrivalPortPage from "./pages/arrival-port/ArrivalPortPage";
import ArrivalPortCreatePage from "./pages/arrival-port/CreatePage";
import ArrivalPortEditPage from "./pages/arrival-port/EditPage";
import ArrivalPortDetails from "./pages/arrival-port/DetailsPage";

// Beds
import BedsPage from "./pages/beds/BedsPage";
import BedsCreatePage from "./pages/beds/CreatePage";
import BedsEditPage from "./pages/beds/EditPage";
import BedsDetails from "./pages/beds/DetailsPage";
import BookingListPage from "./pages/BookingList/BookingListPage";
import BookingListDetailsPage from "./pages/BookingList/DetailsPage";
import BookingListCreatePage from "./pages/BookingList/CreatePage";
import BookingListEditPage from "./pages/BookingList/EditPage";

// Wake Up Calls
import WakeUpCallsPage from "./pages/wake-up-calls/WakeUpCallsPage";
import WakeUpCallsCreatePage from "./pages/wake-up-calls/CreatePage";
import WakeUpCallsEditPage from "./pages/wake-up-calls/EditPage";
import WakeUpCallsDetails from "./pages/wake-up-calls/DetailsPage";

// Delivery Order Logistic
import DeliveryOrderLogisticPage from "./pages/delivery-notes-logistics/DeliveryOrderLogisticPage";
import DeliveryOrderLogisticCreatePage from "./pages/delivery-notes-logistics/CreatePage";
import DeliveryOrderLogisticEditPage from "./pages/delivery-notes-logistics/EditPage";
import DeliveryOrderLogisticDetailsPage from "./pages/delivery-notes-logistics/DeliveryOrderDetails";
// Award Lists
import AwardListsPage from "./pages/award-lists/AwardListsPage";
import AwardListsCreatePage from "./pages/award-lists/CreatePage";
import AwardListsEditPage from "./pages/award-lists/EditPage";
import AwardListsDetails from "./pages/award-lists/DetailsPage";

// Receive Port Logistic
import ReceivePortLogisticPage from "./pages/receive-port-logistic/ReceivePortLogisticPage";
import ReceivePortLogisticCreatePage from "./pages/receive-port-logistic/CreatePage";
import ReceivePortLogisticEditPage from "./pages/receive-port-logistic/EditPage";
import ReceivePortLogisticDetails from "./pages/receive-port-logistic/ReceivePortLogisticDetails";

// shipping
import ShippingPage from "./pages/shipping/ShippingPage";
import ShippingCreatePage from "./pages/shipping/CreatePage";
import ShippingEditPage from "./pages/shipping/EditPage";
import ShippingDetails from "./pages/shipping/ShippingDetails";

// Booking Source
import BookingSourcePage from "./pages/BookingSources/BookingSourcePage";
import BookingSourceCreatePage from "./pages/BookingSources/CreatePage";
import BookingSourceEditPage from "./pages/BookingSources/EditPage";
import BookingSourceDetailsPage from "./pages/BookingSources/DetailsPage";

// Job Categories
import JobCategoriesPage from "./pages/JobCategorie/JobCategoriesPage";
import JobCategoriesCreatePage from "./pages/JobCategorie/CreatePage";
import JobCategoriesEditPage from "./pages/JobCategorie/EditPage";
import JobCategoriesDetailsPage from "./pages/JobCategorie/DetailsPage";
// Shift
import ShiftPage from "./pages/shifts/ShiftPage";
import ShiftDetailsPage from "./pages/shifts/DetailsPage";
import ShiftCreatePage from "./pages/shifts/CreatePage";
import ShiftEditPage from "./pages/shifts/EditPage";

// Notice Boards
import NoticeBoardsPage from "./pages/notice-boards/NoticeBoardsPage";
import NoticeBoardsCreatePage from "./pages/notice-boards/CreatePage";
import NoticeBoardsEditPage from "./pages/notice-boards/EditPage";
import NoticeBoardsDetails from "./pages/notice-boards/DetailsPage";

// Training Programs
import TrainingProgramsPage from "./pages/training-programs/TrainingProgramsPage";
import TrainingProgramsCreatePage from "./pages/training-programs/CreatePage";
import TrainingProgramsEditPage from "./pages/training-programs/EditPage";
import TrainingProgramsDetails from "./pages/training-programs/DetailsPage";

// Employee Performances
import EmployeePerformancesPage from "./pages/employee-performances/EmployeePerformancesPage";
import EmployeePerformancesCreatePage from "./pages/employee-performances/CreatePage";
import EmployeePerformancesEditPage from "./pages/employee-performances/EditPage";
import EmployeePerformancesDetails from "./pages/employee-performances/DetailsPage";

// Picking
import PackingPage from "./pages/packing/PackingPage";
import PackingCreatePage from "./pages/packing/CreatePage";
import PackingEditPage from "./pages/packing/EditPage";
import PackingDetails from "./pages/packing/PackingDetails";

// Checkin
import CheckinPage from "./pages/checkin/CheckinPage";
import CheckinCreatePage from "./pages/checkin/CreatePage";
import CheckinEditPage from "./pages/checkin/EditPage";
import CheckinDetails from "./pages/checkin/CheckinDetails";

// Checkout
import CheckoutPage from "./pages/checkout/CheckoutPage";
import CheckoutCreatePage from "./pages/checkout/CreatePage";
import CheckoutEditPage from "./pages/checkout/EditPage";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";

// Warranties
import WarrantiesPage from "./pages/warranties/WarrantiesPage";
import WarrantiesCreatePage from "./pages/warranties/CreatePage";
import WarrantiesEditPage from "./pages/warranties/EditPage";
import WarrantiesDetails from "./pages/warranties/DetailsPage";

// Audits
import AuditsPage from "./pages/audits/AuditsPage";
import AuditsCreatePage from "./pages/audits/CreatePage";
import AuditsEditPage from "./pages/audits/EditPage";
import AuditsDetails from "./pages/audits/DetailsPage";

// Job Post
import JobPostPage from "./pages/job-post/JobPostPage";
import JobPostCreatePage from "./pages/job-post/CreatePage";
import JobPostEditPage from "./pages/job-post/EditPage";
import JobPostDetails from "./pages/job-post/JobPostDetails";

// Licenses
import LicensesPage from "./pages/licenses/LicensesPage";
import LicensesCreatePage from "./pages/licenses/CreatePage";
import LicensesEditPage from "./pages/licenses/EditPage";
import LicensesDetails from "./pages/licenses/LicensesDetails";

// Pre-Alerts
import PreAlertsPage from "./pages/pre-alerts/PreAlertsPage";
import PreAlertsCreatePage from "./pages/pre-alerts/CreatePage";
import PreAlertsEditPage from "./pages/pre-alerts/EditPage";
import PreAlertsDetails from "./pages/pre-alerts/PerAlertsDetails";

// Positions
import PositionsPage from "./pages/positions/PositionsPage";
import PositionsCreatePage from "./pages/positions/CreatePage";
import PositionsEditPage from "./pages/positions/EditPage";
import PositionsDetails from "./pages/positions/PositionsDetails";

// Warranty Information
import WarrantyInformationPage from "./pages/warranty-information/WarrantyInformationPage";

// Bills of Materials
import BillsOfMaterialsPage from "./pages/bills-of-materials/BillsOfMaterialsPage";
import BillsOfMaterialsCreatePage from "./pages/bills-of-materials/CreatePage";
import BillsOfMaterialsEditPage from "./pages/bills-of-materials/EditPage";
import BillsOfMaterialsDetails from "./pages/bills-of-materials/DetailsPage";

// Complementaries
import ComplementariesPage from "./pages/complementaries/ComplementariesPage";
import ComplementariesCreatePage from "./pages/complementaries/CreatePage";
import ComplementariesEditPage from "./pages/complementaries/EditPage";
import ComplementariesDetails from "./pages/complementaries/ComplementariesDetails";

// Work Orders
import WorkOrdersPage from "./pages/work-orders/WorkOrdersPage";
import WorkOrdersCreatePage from "./pages/work-orders/CreatePage";
import WorkOrdersEditPage from "./pages/work-orders/EditPage";
import WorkOrdersDetails from "./pages/work-orders/WorkOrdersDetails";

// plans
import PlansPage from "./pages/plans/PlansPage";
import PlansCreatePage from "./pages/plans/CreatePage";
import PlansEditPage from "./pages/plans/EditPage";
import PlansDetails from "./pages/plans/DetailsPage";

// ticket status
import TicketStatusPage from "./pages/ticket-status/ListPage";
import TicketStatusCreatePage from "./pages/ticket-status/CreatePage";
import TicketStatusEditPage from "./pages/ticket-status/EditPage";
import TicketStatusDetails from "./pages/ticket-status/DetailsPage";

// expense categories
import ExpenseCategoriesPage from "./pages/expense-categories/ListPage";
import ExpenseCategoriesCreatePage from "./pages/expense-categories/CreatePage";
import ExpenseCategoriesEditPage from "./pages/expense-categories/EditPage";
import ExpenseCategoriesDetails from "./pages/expense-categories/DetailsPage";

// expense sub categories
import ExpenseSubCategoriesPage from "./pages/expense-sub-categories/ListPage";
import ExpenseSubCategoriesCreatePage from "./pages/expense-sub-categories/CreatePage";
import ExpenseSubCategoriesEditPage from "./pages/expense-sub-categories/EditPage";
import ExpenseSubCategoriesDetails from "./pages/expense-sub-categories/DetailsPage";

// medicine category
import MedicineCategoryPage from "./pages/medicine-category/ListPage";
import MedicineCategoryCreatePage from "./pages/medicine-category/CreatePage";
import MedicineCategoryEditPage from "./pages/medicine-category/EditPage";
import MedicineCategoryDetails from "./pages/medicine-category/DetailsPage";

// patient admission
import PatientAdmissionPage from "./pages/patient-admission/ListPage";
import PatientAdmissionCreatePage from "./pages/patient-admission/CreatePage";
import PatientAdmissionEditPage from "./pages/patient-admission/EditPage";
import PatientAdmissionDetails from "./pages/patient-admission/DetailsPage";

// advance payment
import AdvancePaymentPage from "./pages/advance-payment/ListPage";
import AdvancePaymentCreatePage from "./pages/advance-payment/CreatePage";
import AdvancePaymentEditPage from "./pages/advance-payment/EditPage";
import AdvancePaymentDetails from "./pages/advance-payment/DetailsPage";

//

// company loans
import CompanyLoansPage from "./pages/company-loans/ListPage";
import CompanyLoansCreatePage from "./pages/company-loans/CreatePage";
import CompanyLoansEditPage from "./pages/company-loans/EditPage";
import CompanyLoansDetails from "./pages/company-loans/DetailsPage";

// company
import CompanyPage from "./pages/company/ListPage";
import CompanyCreatePage from "./pages/company/CreatePage";
import CompanyEditPage from "./pages/company/EditPage";
import CompanyDetails from "./pages/company/DetailsPage";

// notice boards
import NoticePage from "./pages/notice/ListPage";
import NoticeCreatePage from "./pages/notice/CreatePage";
import NoticeEditPage from "./pages/notice/EditPage";
import NoticeDetails from "./pages/notice/DetailsPage";

// prescription
import PrescriptionPage from "./pages/prescription/ListPage";

// medication-reports
import MedicationReportsPage from "./pages/medication-reports/ListPage";

// visiting-reports
import VisitingReportsPage from "./pages/visiting-reports/ListPage";

// purchase-reports
import PurchaseReportsPage from "./pages/purchase-reports/ListPage";

// purchase-return-reports
import PurchaseReturnReportsPage from "./pages/purchase-return-reports/ListPage";

// purchase-tax-reports
import PurchaseTaxReportsPage from "./pages/purchase-tax-report/ListPage";

// sales-reports
import SalesReportsPage from "./pages/sales-reports/ListPage";

// revokes
import RevokesPage from "./pages/revokes/ListPage";

// sales-return-reports
import SalesReturnReportsPage from "./pages/sales-return-reports/ListPage";

// sales-tax-reports
import SalesTaxReportsPage from "./pages/sales-tax-reports/ListPage";

// ticket priorities
import TicketPrioritiesPage from "./pages/ticket-priorities/ListPage";
import TicketPrioritiesCreatePage from "./pages/ticket-priorities/CreatePage";
import TicketPrioritiesEditPage from "./pages/ticket-priorities/EditPage";
import TicketPrioritiesDetails from "./pages/ticket-priorities/DetailsPage";

// garage
import GaragesPage from "./pages/garages/ListPage";
import GaragesCreatePage from "./pages/garages/CreatePage";
import GaragesEditPage from "./pages/garages/EditPage";
import GaragesDetails from "./pages/garages/DetailsPage";

// Predefined Replies
import PredefinedRepliesPage from "./pages/predefined-replies/ListPage";
import PredefinedRepliesCreatePage from "./pages/predefined-replies/CreatePage";
import PredefinedRepliesEditPage from "./pages/predefined-replies/EditPage";
import PredefinedRepliesDetails from "./pages/predefined-replies/DetailsPage";

// bonus type
import BonusTypePage from "./pages/bonus-type/BonusTypePage";
import BonusTypeCreatePage from "./pages/bonus-type/CreatePage";
import BonusTypeEditPage from "./pages/bonus-type/EditPage";
import BonusTypeDetails from "./pages/bonus-type/DetailsPage";

// Campaigns
import CampaignsPage from "./pages/campaigns/CampaignsPage";
import CampaignsCreatePage from "./pages/campaigns/CreatePage";
import CampaignsEditPage from "./pages/campaigns/EditPage";
import CampaignsDetails from "./pages/campaigns/DetailsPage";

// Accessories
import AccessoriesPage from "./pages/accessories/AccessoriesPage";
import AccessoriesCreatePage from "./pages/accessories/CreatePage";
import AccessoriesEditPage from "./pages/accessories/EditPage";
import AccessoriesDetails from "./pages/accessories/DetailsPage";

// Work Centers
import WorkCentersPage from "./pages/workCenters/WorkCentersPage";
import WorkCentersCreatePage from "./pages/workCenters/CreatePage";
import WorkCentersEditPage from "./pages/workCenters/EditPage";
import WorkCentersDetails from "./pages/workCenters/DetailsPage";

// Consumables
import ConsumablesPage from "./pages/consumables/ConsumablesPage";
import ConsumablesCreatePage from "./pages/consumables/CreatePage";
import ConsumablesEditPage from "./pages/consumables/EditPage";
import ConsumablesDetails from "./pages/consumables/DetailsPage";

// Tickets
import TicketsPage from "./pages/tickets/TicketsPage";
import TicketsEditPage from "./pages/tickets/EditPage";
import TicketsCreatePage from "./pages/tickets/CreatePage";
import TicketsDetails from "./pages/tickets/DetailsPage";

// Project Contract Type
import ProjectContractTypePage from "./pages/projectContractType/ProjectContractTypePage";
import ProjectContractTypeCreatePage from "./pages/projectContractType/CreatePage";
import ProjectContractTypeEditPage from "./pages/projectContractType/EditPage";
import ProjectContractTypeDetails from "./pages/projectContractType/DetailsPage";

// Production
import ProductionPage from "./pages/production/ProductionPage";
import ProductionCreatePage from "./pages/production/CreatePage";
import ProductionEditPage from "./pages/production/EditPage";
import ProductionDetails from "./pages/production/DetailsPage";

// Service Categories
import ServiceCategoriesPage from "./pages/service-categories/ServiceCategoriesPage";
import ServiceCategoriesCreatePage from "./pages/service-categories/CreatePage";
import ServiceCategoriesEditPage from "./pages/service-categories/EditPage";
import ServiceCategoriesDetails from "./pages/service-categories/DetailsPage";

// Service
import ServicePage from "./pages/service/ServicePage";
import ServiceCreatePage from "./pages/service/CreatePage";
import ServiceEditPage from "./pages/service/EditPage";
import ServiceDetails from "./pages/service/DetailsPage";

// Logged Users
import LoggedUsersPage from "./pages/logged-users/LoggedUsersPage";

// Print Label
import PrintLabelPage from "./pages/print-labels/PrintLabelsPage";

// Payslips
import PayslipsPage from "./pages/payslips/PayslipsPage";
import PayslipsCreatePage from "./pages/payslips/CreatePage";
import PayslipsEditPage from "./pages/payslips/EditPage";
import PayslipsDetails from "./pages/payslips/DetailsPage";

// Payment Modes
import PaymentModesPage from "./pages/payment-modes/PaymentModesPage";
import PaymentModesCreatePage from "./pages/payment-modes/CreatePage";
import PaymentModesEditPage from "./pages/payment-modes/EditPage";
import PaymentModesDetails from "./pages/payment-modes/DetailsPage";

// Financial Year Ending
import FinancialYearEndingPage from "./pages/financial-year-ending/FinancialYearEndingPage";

// Salary Sheet
import SalarySheetPage from "./pages/SalarySheet/SalarySheetPage";
import SalarySheetCreatePage from "./pages/SalarySheet/CreatePage";
import SalarySheetEditPage from "./pages/SalarySheet/EditPage";
import SalarySheetDetails from "./pages/SalarySheet/DetailsPage";

// Loan Type
import LoanTypePage from "./pages/loan-type/LoanTypePage";
import LoanTypeCreatePage from "./pages/loan-type/CreatePage";
import LoanTypeEditPage from "./pages/loan-type/EditPage";
import LoanTypeDetails from "./pages/loan-type/DetailsPage";

// Allowance Type
import AllowanceTypePage from "./pages/allowance-type/AllowanceTypePage";
import AllowanceTypeCreatePage from "./pages/allowance-type/CreatePage";
import AllowanceTypeEditPage from "./pages/allowance-type/EditPage";
import AllowanceTypeDetails from "./pages/allowance-type/DetailsPage";

// Project Status
import ProjectStatusPage from "./pages/project-status/ProjectStatusPage";
import ProjectStatusCreatePage from "./pages/project-status/CreatePage";
import ProjectStatusEditPage from "./pages/project-status/EditPage";
import ProjectStatusDetails from "./pages/project-status/DetailsPage";

// Contract
import ContractPage from "./pages/contract/ContractPage";
import ContractCreatePage from "./pages/contract/CreatePage";
import ContractEditPage from "./pages/contract/EditPage";
import ContractDetails from "./pages/contract/DetailsPage";

// Project Group
import ProjectGroupPage from "./pages/project-group/ProjectGroupPage";
import ProjectGroupCreatePage from "./pages/project-group/CreatePage";
import ProjectGroupEditPage from "./pages/project-group/EditPage";
import ProjectGroupDetails from "./pages/project-group/DetailsPage";

// Facility
import FacilityPage from "./pages/facility/FacilityPage";
import FacilityCreatePage from "./pages/facility/CreatePage";
import FacilityEditPage from "./pages/facility/EditPage";
import FacilityDetails from "./pages/facility/DetailsPage";

// Promocodes
import PromocodesPage from "./pages/promocodes/PromocodesPage";
import PromocodesCreatePage from "./pages/promocodes/CreatePage";
import PromocodesEditPage from "./pages/promocodes/EditPage";
import PromocodesDetails from "./pages/promocodes/DetailsPage";

// Depandants
import DepandantsPage from "./pages/dependants/DependantsPage";
import DepandantsCreatePage from "./pages/dependants/CreatePage";
import DepandantsEditPage from "./pages/dependants/EditPage";
import DepandantsDetails from "./pages/dependants/DetailsPage";

// Facility Details
import FacilityDetailsPage from "./pages/facilitydetails/DependantsPage";
import FacilityDetailsCreatePage from "./pages/facilitydetails/CreatePage";
import FacilityDetailsEditPage from "./pages/facilitydetails/EditPage";
import FacilityDetailsDetails from "./pages/facilitydetails/DetailsPage";

// Birth Report
import BirthReportPage from "./pages/birth-report/BirthReportPage";
import BirthReportCreatePage from "./pages/birth-report/CreatePage";
import BirthReportEditPage from "./pages/birth-report/EditPage";
import BirthReportDetailsPage from "./pages/birth-report/DetailsPage";

import DeathReportPage from "./pages/death-report/DeathReportPage";
import DeathReportCreatePage from "./pages/death-report/CreatePage";
import DeathReportEditPage from "./pages/death-report/EditPage";
import DeathReportDetailsPage from "./pages/death-report/DetailsPage";

import InvestigationReportPage from "./pages/investigation-report/InvestigationReportPage";
import InvestigationReportCreatePage from "./pages/investigation-report/CreatePage";
import InvestigationReportEditPage from "./pages/investigation-report/EditPage";
import InvestigationReportDetailsPage from "./pages/investigation-report/DetailsPage";
// Doctor
import DoctorPage from "./pages/doctor/DoctorPage";
import DoctorCreatePage from "./pages/doctor/CreatePage";
import DoctorEditPage from "./pages/doctor/EditPage";
import DoctorDetails from "./pages/doctor/DetailsPage";

// Patient
import PatientPage from "./pages/patient/PatientPage";
import PatientCreatePage from "./pages/patient/CreatePage";
import PatientEditPage from "./pages/patient/EditPage";
import PatientDetails from "./pages/patient/DetailsPage";

// Schedule
import SchedulePage from "./pages/schedule/SchedulePage";
import ScheduleCreatePage from "./pages/schedule/CreatePage";
import ScheduleEditPage from "./pages/schedule/EditPage";
import ScheduleDetails from "./pages/schedule/DetailsPage";

// Operation Report
import OperationReportPage from "./pages/operation-report/OperationReportPage";
import OperationReportCreatePage from "./pages/operation-report/CreatePage";
import OperationReportEditPage from "./pages/operation-report/EditPage";
import OperationReportDetailsPage from "./pages/operation-report/DetailsPage";

// Operation Report
import AssignRepresentativePage from "./pages/assign-by-representative/AssignRepresentativePage";

// Medicine
import MedicinePage from "./pages/medicine/MedicinePage";
import MedicineCreatePage from "./pages/medicine/CreatePage";
import MedicineEditPage from "./pages/medicine/EditPage";
import MedicineDetails from "./pages/medicine/DetailsPage";
// Assign By All
import AssignByAllPage from "./pages/assign-by-all/AssignByAllPage";
import AssignByAllCreatePage from "./pages/assign-by-all/CreatePage";
import AssignByAllEditPage from "./pages/assign-by-all/EditPage";
import AssignByAllDetails from "./pages/assign-by-all/DetailsPage";

// Assign By Doctor
import AssignByDoctorPage from "./pages/assign-by-doctor/AssignByDoctorPage";
import AssignByDoctorCreatePage from "./pages/assign-by-doctor/CreatePage";
import AssignByDoctorEditPage from "./pages/assign-by-doctor/EditPage";
import AssignByDoctorDetails from "./pages/assign-by-doctor/DetailsPage";
// import PaymentDetailsPage from "./pages/payment/PaymentDetails";
import ExpenseReportsPage from "./pages/expense-reports/ExpenseReportsPage";
import ExpenseReportsCreatePage from "./pages/expense-reports/CreatePage";
import ExpenseReportsEditPage from "./pages/expense-reports/EditPage";
import ExpenseReportsDetails from "./pages/expense-reports/DetailsPage";
import SupplierItemsReportPage from "./pages/supplier-items-report/SupplierItemsReportPage";
import SupplierItemsReportEditPage from "./pages/supplier-items-report/EditPage";
import SupplierItemsReportCreatePage from "./pages/supplier-items-report/CreatePage";
import SupplierItemsReportDetails from "./pages/supplier-items-report/DetailsPage";
import BedPage from "./pages/bed/BedPage";
import BedCreatePage from "./pages/bed/CreatePage";
import BedEditPage from "./pages/bed/EditPage";
import BedDetails from "./pages/bed/DetailsPage";
import BedAssignPage from "./pages/bed-assign/BedAssignPage";
import BedAssignCreatePage from "./pages/bed-assign/CreatePage";
import BedAssignEditPage from "./pages/bed-assign/EditPage";
import BedAssignDetails from "./pages/bed-assign/DetailsPage";
import BedReportsPage from "./pages/bed-reports/BedReportsPage";
import BedReportsEditPage from "./pages/bed-reports/EditPage";
import BedReportsCreatePage from "./pages/bed-reports/CreatePage";
import BedReportsDetails from "./pages/bed-reports/DetailsPage";

// Sub Category
import SubCategoryPage from "./pages/sub-category/SubCategoryPage";
import SubCategoryCreatePage from "./pages/sub-category/CreatePage";
import SubCategoryEditPage from "./pages/sub-category/EditPage";
import SubCategoryDetails from "./pages/sub-category/DetailsPage";

// Product Unit
import ProductUnitPage from "./pages/product-unit/ProductUnitPage";
import ProductUnitCreatePage from "./pages/product-unit/CreatePage";
import ProductUnitEditPage from "./pages/product-unit/EditPage";
import ProductUnitDetails from "./pages/product-unit/DetailsPage";

// Time Slot
import TimeSlotPage from "./pages/time-slot/TimeSlotPage";
import TimeSlotCreatePage from "./pages/time-slot/CreatePage";
import TimeSlotEditPage from "./pages/time-slot/EditPage";
import TimeSlotDetails from "./pages/time-slot/DetailsPage";

// Employee Statement
import EmployeeStatementPage from "./pages/employee-statement/EmployeeStatementPage";
import EmployeeStatementDetails from "./pages/employee-statement/DetailsPage";
import EmployeeStatements from "./pages/employee-statement/Statements";

// Supplier Statement
import SupplierStatementPage from "./pages/supplier-statement/SupplierStatementPage";
import SupplierStatementDetails from "./pages/supplier-statement/DetailsPage";
import SupplierStatements from "./pages/supplier-statement/Statements";

// Package
import PackagePage from "./pages/package/PackagePage";
import PackageCreatePage from "./pages/package/CreatePage";
import PackageEditPage from "./pages/package/EditPage";
import PackageDetails from "./pages/package/DetailsPage";

// Patient Medication
import PatientMedicationPage from "./pages/patient-medication/PatienttMadicationPage";
import PatientMedicationCreatePage from "./pages/patient-medication/CreatePage";
import PatientMedicationEditPage from "./pages/patient-medication/EditPage";
import PatientMedicationDetails from "./pages/patient-medication/DetailsPage";

// Patient Visit
import PatientVisitPage from "./pages/patient-visit/PatientVisitPage";
import PatientVisitCreatePage from "./pages/patient-visit/CreatePage";
import PatientVisitEditPage from "./pages/patient-visit/EditPage";
import PatientVisitDetails from "./pages/patient-visit/DetailsPage";
import BedTransferPage from "./pages/bed-transfer/BedTransferPage";
import BedTransferCreatePage from "./pages/bed-transfer/CreatePage";
import BedTransferEditPage from "./pages/bed-transfer/EditPage";
import BedTransferDetails from "./pages/bed-transfer/DetailsPage";

// Bill
import BillPage from "./pages/bill/BillPage";
import BillCreatePage from "./pages/bill/CreatePage";
import BillEditPage from "./pages/bill/EditPage";
import BillDetails from "./pages/bill/DetailsPage";

// Patient Appoinment
import PatientAppoinmentPage from "./pages/patient-appoinment/PatientAppoinmentPage";
import PatientAppoinmentCreatePage from "./pages/patient-appoinment/CreatePage";
import PatientAppoinmentEditPage from "./pages/patient-appoinment/EditPage";
import PatientAppoinmentDetails from "./pages/patient-appoinment/DetailsPage";
import PaymentDetailsPage from "./pages/payment/Paymentdetails";
import SalesItemReportsPage from "./pages/sales-item-reports/ListPage";
import SalesmanSalesReportsPage from "./pages/salesman-sales-reports/ListPage";
import CurrentStockReportsPage from "./pages/current-stock-reports/ListPage";
import ProfitLossPage from "./pages/profit-loss/ListPage";

// Invoice Payments
import InvoicePaymentsPage from "./pages/invoice-payments/InvoicePaymentsPage";
import InvoicePaymentsCreatePage from "./pages/invoice-payments/CreatePage";
import InvoicePaymentsEditPage from "./pages/invoice-payments/EditPage";
import InvoicePaymentsDetails from "./pages/invoice-payments/DetailsPage";

// Enquiry
import EnquiryPage from "./pages/enquiry/EnquiryPage";
import EnquiryCreatePage from "./pages/enquiry/CreatePage";
import EnquiryEditPage from "./pages/enquiry/EditPage";
import EnquiryDetails from "./pages/enquiry/DetailsPage";

// VAT Reports
import VatReportsPage from "./pages/vat-reports/vatReportsPage";
import VatReportsCreatePage from "./pages/vat-reports/CreatePage";
import VatReportsEditPage from "./pages/vat-reports/EditPage";
import VatReportsDetails from "./pages/vat-reports/DetailsPage";
import ReceivedVoucherDetails from "./pages/received-voucher/DetailsPage";
import ReceivedVoucherCreatePage from "./pages/received-voucher/CreatePage";
import ReceivedVoucherEditPage from "./pages/received-voucher/EditPage";
import ReceivedVoucherPage from "./pages/received-voucher/ReceivedVoucherPage";
import SubscribePage from "./pages/subscribe/SubscribePage";
import ShortcutPage from "./pages/shortcut/ShortcutPage";
import ShortcutCreatePage from "./pages/shortcut/CreatePage";
import ShortcutEditPage from "./pages/shortcut/EditPage";
import ShortcutDetails from "./pages/shortcut/DetailsPage";

// Team Members
import TeamMembersPage from "./pages/team-members/TeamMemebrsPage";
import TeamMembersCreatePage from "./pages/team-members/CreatePage";
import TeamMembersEditPage from "./pages/team-members/EditPage";
import TeamMembersDetails from "./pages/team-members/DetailsPage";

// Client
import ClientPage from "./pages/client/ClientPage";
import ClientCreatePage from "./pages/client/CreatePage";
import ClientEditPage from "./pages/client/EditPage";
import ClientDetails from "./pages/client/DetailsPage";

// Contact Form
import ContactFormPage from "./pages/contact-form/ContactFormPage";
import ContactFormCreatePage from "./pages/contact-form/CreatePage";
import ContactFormEditPage from "./pages/contact-form/EditPage";
import ContactFormDetails from "./pages/contact-form/DetailsPage";
import SlidersPage from "./pages/sliders/SlidersPage";
import SlidersCreatePage from "./pages/sliders/CreatePage";
import SlidersEditPage from "./pages/sliders/EditPage";
import SlidersDetails from "./pages/sliders/DetailsPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogCreatePage from "./pages/blog/CreatePage";
import BlogEditPage from "./pages/blog/EditPage";
import BlogDetails from "./pages/blog/DetailsPage";

// Category
import CategoryPage from "./pages/category/CategoryPage";
import CategoryCreatePage from "./pages/category/CreatePage";
import CategoryEditPage from "./pages/category/EditPage";
import CategoryDetails from "./pages/category/DetailsPage";

function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";

    // Set the saved language and direction
    document.documentElement.setAttribute(
      "dir",
      savedLang === "ar" ? "rtl" : "ltr"
    );
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const CORRECT_PIN = "1234";
  const [locked, setLocked] = useState(false);

  // Reset lock state when user logs out or logs in
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear on logout
      setLocked(false);
      localStorage.removeItem("isLocked");
      localStorage.removeItem("lastActivity");
    } else {
      // On login
      const isLockedInStorage = localStorage.getItem("isLocked") === "true";
      if (isLockedInStorage) {
        setLocked(true);
      } else {
        // Make sure lastActivity is set fresh before timer starts
        const now = Date.now();
        localStorage.setItem("lastActivity", now.toString());
        setLocked(false);
      }
    }
  }, [isAuthenticated]);

  // Only start inactivity timer if user is authenticated
  useInactivityTimer(
    () => {
      setLocked(true);
    },
    1 * 60 * 10000000000000,
    200,
    isAuthenticated
  );

  useEffect(() => {
    const isLockedInStorage = localStorage.getItem("isLocked") === "true";
    if (isLockedInStorage && isAuthenticated) {
      setLocked(true);
    }
  }, []);

  // useEffect(() => {
  //   // Disable right-click context menu
  //   const handleContextMenu = (e: any) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   // Add event listener
  //   document.addEventListener("contextmenu", handleContextMenu);

  //   // Cleanup on unmount
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <>
      {locked && isAuthenticated && (
        <LockScreen
          correctPin={CORRECT_PIN}
          onUnlock={() => setLocked(false)}
        />
      )}
      <div
        className={cn(
          locked && isAuthenticated
            ? "pointer-events-none blur-md select-none"
            : "scroll-smooth"
        )}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Dashboard />} />

                {/* Users */}

                {/* Permissions */}
                <Route path="/permissions" element={<PermissionsPage />} />
                <Route
                  path="/permissions/create"
                  element={<PermissionsCreatePage />}
                />
                {/* Language */}
                <Route path="/languages" element={<LanguagePage />} />
                <Route path="/languages/:id" element={<LanguageDetails />} />
                <Route
                  path="/languages/create"
                  element={<LanguageCreatePage />}
                />
                <Route
                  path="/languages/:id/edit"
                  element={<LanguageEditPage isEdit={true} />}
                />
                <Route
                  path="/languages/edit/:id"
                  element={<LanguageEditPage isEdit={true} />}
                />
                <Route path="/languages/view" element={<LanguageDetails />} />
                {/* Users Location */}
                <Route path="/users-location" element={<UsersLocationPage />} />

                {/* leads => leads */}
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/leads/:id" element={<LeadsDetailsPage />} />
                <Route path="/leads/create" element={<LeadsCreatePage />} />
                <Route
                  path="/leads/edit/:id"
                  element={<LeadsEditPage isEdit={true} />}
                />
                <Route path="/leads/view" element={<LeadsDetailsPage />} />

                {/* Lead Sources */}
                <Route path="/lead-sources" element={<LeadSourcesPage />} />
                <Route
                  path="/lead-sources/:id"
                  element={<LeadSourcesDetails />}
                />
                <Route
                  path="/lead-sources/create"
                  element={<LeadSourcesCreatePage />}
                />
                <Route
                  path="/lead-sources/:id/edit"
                  element={<LeadSourcesEditPage isEdit={true} />}
                />
                <Route
                  path="/lead-sources/edit/:id"
                  element={<LeadSourcesEditPage isEdit={true} />}
                />
                <Route
                  path="/lead-sources/view"
                  element={<LeadSourcesDetails />}
                />

                {/* Lead Status */}
                <Route path="/lead-status" element={<LeadStatusPage />} />
                <Route
                  path="/lead-status/:id"
                  element={<LeadStatusDetails />}
                />
                <Route
                  path="/lead-status/create"
                  element={<LeadStatusCreatePage />}
                />
                <Route
                  path="/lead-status/:id/edit"
                  element={<LeadStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/lead-status/edit/:id"
                  element={<LeadStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/lead-status/view"
                  element={<LeadStatusDetails />}
                />

                {/* Colors */}
                <Route path="/colors" element={<ColorsPage />} />
                <Route
                  path="/colors/create"
                  element={<ColorsCreatePage isEdit={false} />}
                />
                <Route
                  path="/colors/:id/edit"
                  element={<ColorsCreatePage isEdit={true} />}
                />
                <Route
                  path="/colors/edit/:id"
                  element={<ColorsEditPage isEdit={true} />}
                />
                <Route path="/colors/:id" element={<ColorsDetails />} />
                <Route path="/colors/view" element={<ColorsDetails />} />

                {/* Sizes */}
                <Route path="/sizes" element={<SizesPage />} />
                <Route
                  path="/sizes/create"
                  element={<SizesCreatePage isEdit={false} />}
                />
                <Route
                  path="/sizes/:id/edit"
                  element={<SizesCreatePage isEdit={true} />}
                />
                <Route
                  path="/sizes/edit/:id"
                  element={<SizesEditPage isEdit={true} />}
                />
                <Route path="/sizes/:id" element={<SizesDetails />} />
                <Route path="/sizes/view" element={<SizesDetails />} />

                {/* Brand */}
                <Route path="/brands" element={<BrandPage />} />
                <Route
                  path="/brands/create"
                  element={<BrandCreatePage isEdit={false} />}
                />
                <Route
                  path="/brands/:id/edit"
                  element={<BrandCreatePage isEdit={true} />}
                />
                <Route
                  path="/brands/edit/:id"
                  element={<BrandEditPage isEdit={true} />}
                />
                <Route path="/brands/:id" element={<BrandDetails />} />
                <Route path="/brands/view" element={<BrandDetails />} />

                {/* Item */}
                <Route path="/items" element={<ItemPage />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                <Route path="/items/create" element={<ItemCreatePage />} />
                <Route
                  path="/items/:id/edit"
                  element={<ItemEditPage isEdit={true} />}
                />
                <Route
                  path="/items/edit/:id"
                  element={<ItemEditPage isEdit={true} />}
                />
                <Route path="/items/view" element={<ItemDetails />} />

                {/* Sub Category */}
                <Route path="/sub-category" element={<SubCategoryPage />} />
                <Route
                  path="/sub-category/:id"
                  element={<SubCategoryDetails />}
                />
                <Route
                  path="/sub-category/create"
                  element={<SubCategoryCreatePage />}
                />
                <Route
                  path="/sub-category/edit/:id"
                  element={<SubCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/sub-category/:id/edit"
                  element={<SubCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/sub-category/view"
                  element={<SubCategoryDetails />}
                />

                {/* Opening Stock Inventory */}
                <Route
                  path="/opening-stock-inventory"
                  element={<OpeningStockInventoryPage />}
                />
                <Route
                  path="/opening-stock-inventory/:id"
                  element={<OpeningStockInventoryDetails />}
                />
                <Route
                  path="/opening-stock-inventory/create"
                  element={<OpeningStockInventoryCreatePage />}
                />
                <Route
                  path="/opening-stock-inventory/edit/:id"
                  element={<OpeningStockInventoryEditPage isEdit={true} />}
                />
                {/* Damage Items */}
                <Route path="/damage-items" element={<DamageItemsPage />} />
                <Route
                  path="/damage-items/:id"
                  element={<DamageItemsDetails />}
                />
                <Route
                  path="/damage-items/create"
                  element={<DamageItemsCreatePage />}
                />
                <Route
                  path="/damage-items/edit/:id"
                  element={<DamageItemsEditPage isEdit={true} />}
                />
                {/* Expiry Items */}
                <Route path="/expiry-items" element={<ExpiryItemsPage />} />
                <Route
                  path="/expiry-items/:id"
                  element={<ExpiryItemsDetails />}
                />
                <Route
                  path="/expiry-items/create"
                  element={<ExpiryItemsCreatePage />}
                />
                <Route
                  path="/expiry-items/:id/edit"
                  element={<ExpiryItemsEditPage isEdit={true} />}
                />
                <Route
                  path="/expiry-items/edit/:id"
                  element={<ExpiryItemsEditPage isEdit={true} />}
                />
                <Route
                  path="/expiry-items/view"
                  element={<ExpiryItemsDetails />}
                />
                {/* Stock Transfer */}
                <Route path="/stock-transfer" element={<StockTransferPage />} />
                <Route
                  path="/stock-transfer/:id"
                  element={<StockTransferDetails />}
                />
                <Route
                  path="/stock-transfer/create"
                  element={<StockTransferCreatePage />}
                />
                <Route
                  path="/stock-transfer/:id/edit"
                  element={<StockTransferEditPage isEdit={true} />}
                />
                <Route
                  path="/stock-transfer/edit/:id"
                  element={<StockTransferEditPage isEdit={true} />}
                />
                <Route
                  path="/stock-transfer/view"
                  element={<StockTransferDetails />}
                />

                {/* Purchase Order Logistic */}
                <Route
                  path="/purchase-order-logistic"
                  element={<PurchaseOrderLogisticPage />}
                />
                <Route
                  path="/purchase-order-logistic/:id"
                  element={<PurchaseOrderLogisticDetails />}
                />
                <Route
                  path="/purchase-order-logistic/create"
                  element={<PurchaseOrderLogisticCreatePage />}
                />
                <Route
                  path="/purchase-order-logistic/edit/:id"
                  element={<PurchaseOrderLogisticEditPage isEdit={true} />}
                />
                <Route
                  path="/purchase-order-logistic/:id/edit"
                  element={<PurchaseOrderLogisticEditPage isEdit={true} />}
                />
                <Route
                  path="/purchase-order-logistic/view"
                  element={<PurchaseOrderLogisticDetails />}
                />

                {/* Invoice */}
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/invoices/:id" element={<InvoicesDetails />} />
                <Route
                  path="/invoices/create"
                  element={<InvoicesCreatePage />}
                />
                <Route
                  path="/invoices/:id/edit"
                  element={<InvoicesEditPage isEdit={true} />}
                />
                <Route
                  path="/invoices/edit/:id"
                  element={<InvoicesEditPage isEdit={true} />}
                />
                <Route path="/invoices/view" element={<InvoicesDetails />} />
                {/* Purchase Returns */}
                <Route
                  path="/purchase-returns"
                  element={<PurchaseReturnsPage />}
                />
                <Route
                  path="/purchase-returns/create"
                  element={<PurchaseReturnsCreatePage />}
                />
                <Route
                  path="/purchase-returns/:id/edit"
                  element={<PurchaseReturnsEditPage isEdit={true} />}
                />
                <Route
                  path="/purchase-returns/edit/:id"
                  element={<PurchaseReturnsEditPage isEdit={true} />}
                />
                <Route
                  path="/purchase-returns/:id"
                  element={<PurchaseReturnsDetails />}
                />
                <Route
                  path="/purchase-returns/view"
                  element={<PurchaseReturnsDetails />}
                />

                {/* {------------------------------------------------------} */}

                {/* Category */}
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/category/:id" element={<CategoryDetails />} />
                <Route
                  path="/category/create"
                  element={<CategoryCreatePage />}
                />
                <Route
                  path="/category/edit/:id"
                  element={<CategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/category/:id/edit"
                  element={<CategoryEditPage isEdit={true} />}
                />
                <Route path="/category/view" element={<CategoryDetails />} />

                {/* Countries */}
                <Route path="/countries" element={<CountryPage />} />
                <Route path="/countries/:id" element={<CountryDetails />} />
                <Route
                  path="/countries/create"
                  element={<CountryFormPage isEdit={false} />}
                />
                <Route
                  path="/countries/:id/edit"
                  element={<CountryFormPage isEdit={true} />}
                />
                <Route
                  path="/countries/edit/:id"
                  element={<EditPage isEdit={true} />}
                />
                <Route path="/countries/view" element={<CountryDetails />} />
                {/* Assets category */}
                <Route path="/assets-category" element={<AssetsPage />} />
                <Route
                  path="/assets-category/:id"
                  element={<AssetsDetails />}
                />
                <Route
                  path="/assets-category/create"
                  element={<AssetsFormPage isEdit={false} />}
                />
                <Route
                  path="/assets-category/edit/:id"
                  element={<AssetsEditPage isEdit={true} />}
                />

                {/* Users */}
                <Route path="/users" element={<UserPage />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route
                  path="/users/create"
                  element={<UserCreatePage isEdit={false} />}
                />
                <Route
                  path="/users/edit/:id"
                  element={<UserEditPage isEdit={true} />}
                />
                <Route path="/users/view" element={<UserDetailsPage />} />

                {/* Users Master */}
                <Route path="/user-master" element={<UserMasterPage />} />
                <Route
                  path="/user-master/:id"
                  element={<UserMasterDetails />}
                />
                <Route
                  path="/user-master/create"
                  element={<UserMasterCreatePage isEdit={false} />}
                />
                <Route
                  path="/user-master/:id/edit"
                  element={<UserMasterCreatePage isEdit={true} />}
                />
                <Route
                  path="/user-master/edit/:id"
                  element={<UserMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/user-master/view"
                  element={<UserMasterDetails />}
                />

                {/* Leads */}
                <Route path="/lead" element={<NewLeadsPage />} />
                <Route path="/lead/:id" element={<NewLeadsDetailsPage />} />
                <Route path="/lead/create" element={<NewLeadsCreatePage />} />
                <Route
                  path="/lead/edit/:id"
                  element={<NewLeadsEditPage isEdit={true} />}
                />
                <Route path="/lead/view" element={<NewLeadsDetailsPage />} />

                {/* Assets Master */}
                <Route path="/assets-master" element={<AssetsMasterPage />} />
                <Route
                  path="/assets-master/:id"
                  element={<AssetsMasterDetailsPage />}
                />
                <Route
                  path="/assets-master/create"
                  element={<AssetsMasterFormPage isEdit={false} />}
                />
                <Route
                  path="/assets-master/edit/:id"
                  element={<AssetsMasterEditPage isEdit={true} />}
                />
                {/* Rental */}
                <Route path="/rental" element={<RentalPage />} />
                <Route path="/rental/:id" element={<RentalDetailsPage />} />
                <Route
                  path="/rental/create"
                  element={<RentalFormPage isEdit={false} />}
                />
                <Route
                  path="/rental/edit/:id"
                  element={<RentalEditPage isEdit={true} />}
                />

                {/* LogBook */}
                <Route path="/log-books" element={<LogBooksPage />} />
                <Route
                  path="/log-books/:id"
                  element={<LogBooksDetailsPage />}
                />
                <Route
                  path="/log-books/create"
                  element={<LogBooksCreatePage isEdit={false} />}
                />
                <Route
                  path="/log-books/edit/:id"
                  element={<LogBooksEditPage isEdit={true} />}
                />
                <Route
                  path="/log-books/view"
                  element={<LogBooksDetailsPage />}
                />

                {/* Drivers */}
                <Route path="/drivers" element={<DriversPage />} />
                <Route path="/drivers/:id" element={<DriversDetailsPage />} />
                <Route
                  path="/drivers/create"
                  element={<DriversCreatePage isEdit={false} />}
                />
                <Route
                  path="/drivers/edit/:id"
                  element={<DriversEditPage isEdit={true} />}
                />
                <Route
                  path="/log-books/view"
                  element={<DriversDetailsPage />}
                />

                {/* Cities */}
                <Route path="/cities" element={<CityPage />} />
                <Route path="/cities/:id" element={<CitiesDetails />} />
                <Route
                  path="/cities/create"
                  element={<CityForm isEdit={false} />}
                />
                <Route
                  path="/cities/edit/:id"
                  element={<CityForm isEdit={true} />}
                />
                <Route path="/cities/view" element={<CitiesDetails />} />
                {/* States */}
                <Route path="/states" element={<StatesPage />} />
                <Route path="/states/:id" element={<StateDetails />} />
                <Route
                  path="/states/create"
                  element={<StateForm isEdit={false} />}
                />
                <Route
                  path="/states/:id/edit"
                  element={<StateForm isEdit={true} />}
                />
                <Route
                  path="/states/edit/:id"
                  element={<StateEditPage isEdit={true} />}
                />
                <Route path="/states/view" element={<StateDetails />} />
                {/* Areas */}
                <Route path="/areas" element={<AreasPage />} />
                <Route path="/areas/:id" element={<AreaDetails />} />
                <Route
                  path="/areas/create"
                  element={<CreatePage isEdit={false} />}
                />
                <Route
                  path="/areas/:id/edit"
                  element={<CreatePage isEdit={true} />}
                />
                <Route
                  path="/areas/edit/:id"
                  element={<AreaEditPage isEdit={true} />}
                />
                <Route path="/areas/view" element={<AreaDetails />} />
                {/* Add other pages here */}
                {/* Currencies */}
                <Route path="/currencies" element={<CurrenciesHome />} />
                <Route path="/currencies/:id" element={<CurrenciesDetails />} />
                <Route
                  path="/currencies/create"
                  element={<CurrencyCreatePage isEdit={false} />}
                />
                <Route
                  path="/currencies/:id/edit"
                  element={<CurrencyCreatePage isEdit={true} />}
                />
                <Route
                  path="/currencies/edit/:id"
                  element={<CurrencyCreatePage isEdit={true} />}
                />
                <Route
                  path="/currencies/view"
                  element={<CurrenciesDetails />}
                />

                {/* Logged Users */}
                <Route path="/logged-users" element={<LoggedUsersPage />} />

                {/* Customers */}
                <Route path="/customers" element={<CustomersPage />} />
                <Route
                  path="/customers/create"
                  element={<CustomerCreatePage isEdit={false} />}
                />
                <Route
                  path="/customers/:id/edit"
                  element={<CustomerCreatePage isEdit={true} />}
                />
                <Route
                  path="/customers/edit/:id"
                  element={<CustomerEditPage isEdit={true} />}
                />
                <Route path="/customers/:id" element={<CustomerDetails />} />
                <Route path="/customers/view" element={<CustomerDetails />} />
                {/* Customer Groups */}
                <Route
                  path="/customer-group"
                  element={<CustomerGroupsPage />}
                />
                <Route
                  path="/customer-group/create"
                  element={<CustomerGroupsCreatePage isEdit={false} />}
                />
                <Route
                  path="/customer-group/edit/:id"
                  element={<CustomerGroupsEditPage isEdit={true} />}
                />
                <Route
                  path="/customer-group/view"
                  element={<CustomerGroupsDetails />}
                />
                <Route
                  path="/customer-group/:id"
                  element={<CustomerGroupsDetails />}
                />
                {/* Holiday */}
                <Route path="/holiday" element={<HolidayPage />} />
                <Route path="/holiday/:id" element={<HolidayDetailsPage />} />
                <Route
                  path="/holiday/create"
                  element={<HolidayFormPage isEdit={false} />}
                />
                <Route
                  path="/holiday/edit/:id"
                  element={<HolidayEditPage isEdit={true} />}
                />
                {/* increments */}
                <Route path="/increments" element={<IncrementsPage />} />
                <Route
                  path="/increments/:id"
                  element={<IncrementsDetailsPage />}
                />
                <Route
                  path="/increments/create"
                  element={<IncrementsFormPage isEdit={false} />}
                />
                <Route
                  path="/increments/edit/:id"
                  element={<IncrementsEditPage isEdit={true} />}
                />

                {/* retirement */}
                <Route path="/retirement" element={<RetirementPage />} />
                <Route
                  path="/retirement/:id"
                  element={<RetirementDetailsPage />}
                />
                <Route
                  path="/retirement/create"
                  element={<RetirementFormPage isEdit={false} />}
                />
                <Route
                  path="/retirement/edit/:id"
                  element={<RetirementEditPage isEdit={true} />}
                />

                {/* suppliers */}
                <Route path="/supplier" element={<SuppliersPage />} />
                <Route
                  path="/supplier/create"
                  element={<SuppliersCreatePage isEdit={false} />}
                />
                <Route
                  path="/supplier/:id/edit"
                  element={<SuppliersCreatePage isEdit={true} />}
                />
                <Route
                  path="/supplier/edit/:id"
                  element={<SuppliersEditPage isEdit={true} />}
                />
                <Route path="/supplier/:id" element={<SuppliersDetails />} />
                <Route path="/supplier/view" element={<SuppliersDetails />} />

                {/* Suppliers Groups */}
                <Route
                  path="/suppliers-group"
                  element={<SuppliersGroupsPage />}
                />
                <Route
                  path="/suppliers-group/create"
                  element={<SuppliersGroupsCreatePage isEdit={false} />}
                />
                <Route
                  path="/suppliers-group/edit/:id"
                  element={<SuppliersGroupsEditPage isEdit={true} />}
                />
                <Route
                  path="/suppliers-group/edit/:id"
                  element={<SuppliersGroupsEditPage isEdit={true} />}
                />
                <Route
                  path="/suppliers-group/:id"
                  element={<SuppliersGroupsDetails />}
                />
                <Route
                  path="/suppliers-group/view"
                  element={<SuppliersGroupsDetails />}
                />
                {/* Waiters */}
                <Route path="/waiters" element={<WaitersPage />} />
                <Route
                  path="/waiters/create"
                  element={<WaitersCreatePage isEdit={false} />}
                />
                <Route
                  path="/waiters/:id/edit"
                  element={<WaitersCreatePage isEdit={true} />}
                />
                <Route
                  path="/waiters/edit/:id"
                  element={<WaitersEditPage isEdit={true} />}
                />
                <Route path="/waiters/:id" element={<WaitersDetails />} />
                <Route path="/waiters/view" element={<WaitersDetails />} />
                {/* Table Assigns */}
                <Route path="/table-assigns" element={<TableAssignsPage />} />
                <Route
                  path="/table-assigns/create"
                  element={<TableAssignsCreatePage isEdit={false} />}
                />
                <Route
                  path="/table-assigns/:id/edit"
                  element={<TableAssignsCreatePage isEdit={true} />}
                />
                <Route
                  path="/table-assigns/edit/:id"
                  element={<TableAssignsEditPage isEdit={true} />}
                />
                <Route
                  path="/table-assigns/:id"
                  element={<TableAssignsDetails />}
                />
                <Route
                  path="/table-assigns/view"
                  element={<TableAssignsDetails />}
                />
                {/* Reservation */}
                <Route path="/reservation" element={<ReservationPage />} />
                <Route
                  path="/reservation/create"
                  element={<ReservationCreatePage isEdit={false} />}
                />
                <Route
                  path="/reservation/:id/edit"
                  element={<ReservationCreatePage isEdit={true} />}
                />
                <Route
                  path="/reservation/edit/:id"
                  element={<ReservationEditPage isEdit={true} />}
                />
                <Route
                  path="/reservation/:id"
                  element={<ReservationDetails />}
                />
                <Route
                  path="/reservation/view"
                  element={<ReservationDetails />}
                />

                {/* Deliverymen */}
                <Route path="/deliverymen" element={<DeliverymenPage />} />
                <Route
                  path="/deliverymen/create"
                  element={<DeliverymenCreatePage isEdit={false} />}
                />
                <Route
                  path="/deliverymen/:id/edit"
                  element={<DeliverymenCreatePage isEdit={true} />}
                />
                <Route
                  path="/deliverymen/edit/:id"
                  element={<DeliverymenEditPage isEdit={true} />}
                />
                <Route
                  path="/deliverymen/:id"
                  element={<DeliverymenDetails />}
                />
                <Route
                  path="/deliverymen/view"
                  element={<DeliverymenDetails />}
                />
                {/* Order Type */}
                <Route path="/order-type" element={<OrderTypePage />} />
                <Route
                  path="/order-type/create"
                  element={<OrderTypeCreatePage isEdit={false} />}
                />
                <Route
                  path="/order-type/:id/edit"
                  element={<OrderTypeCreatePage isEdit={true} />}
                />
                <Route
                  path="/order-type/edit/:id"
                  element={<OrderTypeEditPage isEdit={true} />}
                />
                <Route path="/order-type/:id" element={<OrderTypeDetails />} />
                <Route path="/order-type/view" element={<OrderTypeDetails />} />

                {/* Warehouse */}
                <Route path="/warehouse" element={<WarehousePage />} />
                <Route
                  path="/warehouse/create"
                  element={<WarehouseCreatePage isEdit={false} />}
                />
                <Route
                  path="/warehouse/:id/edit"
                  element={<WarehouseCreatePage isEdit={true} />}
                />
                <Route
                  path="/warehouse/edit/:id"
                  element={<WarehouseEditPage isEdit={true} />}
                />
                <Route path="/warehouse/:id" element={<WarehouseDetails />} />
                <Route path="/warehouse/view" element={<WarehouseDetails />} />
                {/* Groups */}
                <Route path="/groups" element={<GroupsPage />} />
                <Route
                  path="/groups/create"
                  element={<GroupsCreatePage isEdit={false} />}
                />
                <Route
                  path="/groups/:id/edit"
                  element={<GroupsCreatePage isEdit={true} />}
                />
                <Route
                  path="/groups/edit/:id"
                  element={<GroupsEditPage isEdit={true} />}
                />
                <Route path="/groups/:id" element={<GroupsDetails />} />
                <Route path="/groups/view" element={<GroupsDetails />} />
                {/* Divisions */}
                <Route path="/divisions" element={<DivisionsPage />} />
                <Route
                  path="/divisions/create"
                  element={<DivisionsCreatePage isEdit={false} />}
                />
                <Route
                  path="/divisions/:id/edit"
                  element={<DivisionsCreatePage isEdit={true} />}
                />
                <Route
                  path="/divisions/edit/:id"
                  element={<DivisionsEditPage isEdit={true} />}
                />
                <Route path="/divisions/:id" element={<DivisionsDetails />} />
                <Route path="/divisions/view" element={<DivisionsDetails />} />
                {/* Sections */}
                <Route path="/sections" element={<SectionsPage />} />
                <Route
                  path="/sections/create"
                  element={<SectionsCreatePage isEdit={false} />}
                />
                <Route
                  path="/sections/:id/edit"
                  element={<SectionsCreatePage isEdit={true} />}
                />
                <Route
                  path="/sections/edit/:id"
                  element={<SectionsEditPage isEdit={true} />}
                />
                <Route path="/sections/:id" element={<SectionsDetails />} />
                <Route path="/sections/view" element={<SectionsDetails />} />
                {/* Shelf */}
                <Route path="/shelf" element={<ShelfPage />} />
                <Route
                  path="/shelf/create"
                  element={<ShelfCreatePage isEdit={false} />}
                />
                <Route
                  path="/shelf/:id/edit"
                  element={<ShelfCreatePage isEdit={true} />}
                />
                <Route
                  path="/shelf/edit/:id"
                  element={<ShelfEditPage isEdit={true} />}
                />
                <Route path="/shelf/:id" element={<ShelfDetails />} />
                <Route path="/shelf/view" element={<ShelfDetails />} />
                {/* Rack */}
                <Route path="/rack" element={<RackPage />} />
                <Route
                  path="/rack/create"
                  element={<RackCreatePage isEdit={false} />}
                />
                <Route
                  path="/rack/:id/edit"
                  element={<RackCreatePage isEdit={true} />}
                />
                <Route
                  path="/rack/edit/:id"
                  element={<RackEditPage isEdit={true} />}
                />
                <Route path="/rack/:id" element={<RackDetails />} />
                <Route path="/rack/view" element={<RackDetails />} />
                {/* Bin */}
                <Route path="/bin" element={<BinPage />} />
                <Route
                  path="/bin/create"
                  element={<BinCreatePage isEdit={false} />}
                />
                <Route
                  path="/bin/:id/edit"
                  element={<BinCreatePage isEdit={true} />}
                />
                <Route
                  path="/bin/edit/:id"
                  element={<BinEditPage isEdit={true} />}
                />
                <Route path="/bin/:id" element={<BinDetails />} />
                <Route path="/bin/view" element={<BinDetails />} />
                {/* Sub Bin */}
                <Route path="/sub-bin" element={<SubBinPage />} />
                <Route
                  path="/sub-bin/create"
                  element={<SubBinCreatePage isEdit={false} />}
                />
                <Route
                  path="/sub-bin/:id/edit"
                  element={<SubBinCreatePage isEdit={true} />}
                />
                <Route
                  path="/sub-bin/edit/:id"
                  element={<SubBinEditPage isEdit={true} />}
                />
                <Route path="/sub-bin/:id" element={<SubBinDetails />} />
                <Route path="/sub-bin/view" element={<SubBinDetails />} />
                {/* Department */}
                <Route path="/department" element={<DepartmentPage />} />
                <Route path="/department/:id" element={<DepartmentDetails />} />
                <Route
                  path="/department/create"
                  element={<DepartmentCreatePage isEdit={false} />}
                />
                <Route
                  path="/department/:id/edit"
                  element={<DepartmentCreatePage isEdit={true} />}
                />
                <Route
                  path="/department/edit/:id"
                  element={<DepartmentEditPage isEdit={true} />}
                />
                <Route
                  path="/department/view"
                  element={<DepartmentDetails />}
                />
                {/* Designation */}
                <Route path="/designation" element={<DesignationPage />} />
                <Route
                  path="/designation/:id"
                  element={<DesignationDetails />}
                />
                <Route
                  path="/designation/create"
                  element={<DesignationCreatePage isEdit={false} />}
                />
                <Route
                  path="/designation/:id/edit"
                  element={<DesignationCreatePage isEdit={true} />}
                />
                <Route
                  path="/designation/edit/:id"
                  element={<DesignationEditPage isEdit={true} />}
                />
                <Route
                  path="/designation/view"
                  element={<DesignationDetails />}
                />
                {/* Companies */}
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/companies/:id" element={<CompaniesDetails />} />
                <Route
                  path="/companies/create"
                  element={<CompaniesCreatePage isEdit={false} />}
                />
                <Route
                  path="/companies/:id/edit"
                  element={<CompaniesCreatePage isEdit={true} />}
                />
                <Route
                  path="/companies/edit/:id"
                  element={<CompaniesEditPage isEdit={true} />}
                />
                <Route path="/companies/view" element={<CompaniesDetails />} />
                {/* Branches */}
                <Route path="/branches" element={<BranchesPage />} />
                <Route path="/branches/:id" element={<BranchesDetails />} />
                <Route
                  path="/branches/create"
                  element={<BranchesCreatePage isEdit={false} />}
                />
                <Route
                  path="/branches/:id/edit"
                  element={<BranchesCreatePage isEdit={true} />}
                />
                <Route
                  path="/branches/edit/:id"
                  element={<BranchesEditPage isEdit={true} />}
                />
                <Route path="/branches/view" element={<BranchesDetails />} />

                {/* Payment */}
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment/:id" element={<PaymentDetailsPage />} />
                <Route
                  path="/payment/create"
                  element={<PaymentCreatePage isEdit={false} />}
                />
                <Route
                  path="/payment/:id/edit"
                  element={<PaymentEditPage isEdit={true} />}
                />
                <Route
                  path="/payment/edit/:id"
                  element={<PaymentEditPage isEdit={true} />}
                />
                <Route path="/payment/view" element={<PaymentDetailsPage />} />

                {/* Employee */}
                <Route path="/employee" element={<EmployeePage />} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
                <Route
                  path="/employee/create"
                  element={<EmployeeCreatePage isEdit={false} />}
                />
                <Route
                  path="/employee/:id/edit"
                  element={<EmployeeCreatePage isEdit={true} />}
                />
                <Route
                  path="/employee/edit/:id"
                  element={<EmployeeEditPage isEdit={true} />}
                />
                <Route path="/employee/view" element={<EmployeeDetails />} />
                {/* Table */}
                <Route path="/tables" element={<TablePage />} />
                <Route path="/tables/:id" element={<TableDetails />} />
                <Route path="/tables/create" element={<TableCreatePage />} />
                <Route
                  path="/tables/:id/edit"
                  element={<TableEditPage isEdit={true} />}
                />
                <Route
                  path="/tables/edit/:id"
                  element={<TableEditPage isEdit={true} />}
                />
                <Route path="/tables/view" element={<TableDetails />} />
                {/* UoMs */}
                <Route path="/uoms" element={<UoMsPage />} />
                <Route path="/uoms/:id" element={<UoMsDetails />} />
                <Route path="/uoms/create" element={<UoMsCreatePage />} />
                <Route
                  path="/uoms/:id/edit"
                  element={<UoMsEditPage isEdit={true} />}
                />
                <Route
                  path="/uoms/edit/:id"
                  element={<UoMsEditPage isEdit={true} />}
                />
                <Route path="/uoms/view" element={<UoMsDetails />} />

                {/* Bank */}
                <Route path="/banks" element={<BankPage />} />
                <Route path="/banks/:id" element={<BankDetails />} />
                <Route path="/banks/create" element={<BankCreatePage />} />
                <Route
                  path="/banks/:id/edit"
                  element={<BankEditPage isEdit={true} />}
                />
                <Route
                  path="/banks/edit/:id"
                  element={<BankEditPage isEdit={true} />}
                />
                <Route path="/banks/view" element={<BankDetails />} />
                {/* Tax */}
                <Route path="/tax" element={<TaxPage />} />
                <Route path="/tax/:id" element={<TaxDetails />} />
                <Route path="/tax/create" element={<TaxCreatePage />} />
                <Route
                  path="/tax/:id/edit"
                  element={<TaxEditPage isEdit={true} />}
                />
                <Route
                  path="/tax/edit/:id"
                  element={<TaxEditPage isEdit={true} />}
                />
                <Route path="/tax/view" element={<TaxDetails />} />
                {/* Store */}
                <Route path="/store" element={<StorePage />} />
                <Route path="/store/:id" element={<StoreDetails />} />
                <Route path="/store/create" element={<StoreCreatePage />} />
                <Route
                  path="/store/:id/edit"
                  element={<StoreEditPage isEdit={true} />}
                />
                <Route
                  path="/store/edit/:id"
                  element={<StoreEditPage isEdit={true} />}
                />
                <Route path="/store/view" element={<StoreDetails />} />
                {/* Salesman */}
                <Route path="/salesman" element={<SalesmanPage />} />
                <Route path="/salesman/:id" element={<SalesmanDetails />} />
                <Route
                  path="/salesman/create"
                  element={<SalesmanCreatePage />}
                />
                <Route
                  path="/salesman/:id/edit"
                  element={<SalesmanEditPage isEdit={true} />}
                />
                <Route
                  path="/salesman/edit/:id"
                  element={<SalesmanEditPage isEdit={true} />}
                />
                <Route path="/salesman/view" element={<SalesmanDetails />} />
                {/* Promotion */}
                <Route path="/promotion" element={<PromotionPage />} />
                <Route path="/promotion/:id" element={<PromotionDetails />} />
                <Route
                  path="/promotion/create"
                  element={<PromotionCreatePage />}
                />
                <Route
                  path="/promotion/:id/edit"
                  element={<PromotionEditPage isEdit={true} />}
                />
                <Route
                  path="/promotion/edit/:id"
                  element={<PromotionEditPage isEdit={true} />}
                />
                <Route path="/promotion/view" element={<PromotionDetails />} />
                {/* Order */}
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/orders/create" element={<OrderCreatePage />} />
                <Route
                  path="/orders/:id/edit"
                  element={<OrderEditPage isEdit={true} />}
                />
                <Route
                  path="/orders/edit/:id"
                  element={<OrderEditPage isEdit={true} />}
                />
                <Route path="/orders/view" element={<OrderDetails />} />

                {/* Delivery Note */}
                <Route
                  path="/delivery-notes/create"
                  element={<DeliveryNoteCreatePage />}
                />
                <Route path="/delivery-notes" element={<DeliveryNotePage />} />
                <Route
                  path="/delivery-notes/:id"
                  element={<DeliveryNoteDetails />}
                />
                <Route
                  path="/delivery-notes/edit/:id"
                  element={<DeliveryNoteEditPage2 isEdit={true} />}
                />
                {/* Sales Quotation */}
                <Route
                  path="/sales-quotation"
                  element={<SalesQuotationPage />}
                />
                <Route
                  path="/sales-quotation/create"
                  element={<SalesQuotationCreatePage />}
                />
                <Route
                  path="/sales-quotation/:id/edit"
                  element={<SalesQuotationEditPage isEdit={true} />}
                />
                <Route
                  path="/sales-quotation/edit/:id"
                  element={<SalesQuotationEditPage isEdit={true} />}
                />
                <Route
                  path="/sales-quotation/:id"
                  element={<SalesQuotationDetails />}
                />
                <Route
                  path="/sales-quotation/view"
                  element={<SalesQuotationDetails />}
                />
                {/* Sales Invoice */}
                <Route path="/sales-invoice" element={<SalesPage />} />
                <Route path="/sales-invoice/:id" element={<SalesDetails />} />
                <Route
                  path="/sales-invoice/create"
                  element={<SalesCreatePage />}
                />
                <Route
                  path="/sales-invoice/:id/edit"
                  element={<SalesEditPage isEdit={true} />}
                />
                <Route
                  path="/sales-invoice/edit/:id"
                  element={<SalesEditPage isEdit={true} />}
                />
                <Route path="/sales-invoice/view" element={<SalesDetails />} />
                {/* Sales Return */}
                <Route path="/sales-return" element={<SalesReturnPage />} />
                <Route
                  path="/sales-return/:id"
                  element={<SalesReturnDetails />}
                />
                <Route
                  path="/sales-return/create"
                  element={<SalesReturnCreatePage />}
                />
                <Route
                  path="/sales-return/:id/edit"
                  element={<SalesReturnEditPage isEdit={true} />}
                />
                <Route
                  path="/sales-return/edit/:id"
                  element={<SalesReturnEditPage isEdit={true} />}
                />
                <Route
                  path="/sales-return/view"
                  element={<SalesReturnDetails />}
                />
                <Route path="/country" element={<CountryNewPage />} />
                {/* Translation */}
                <Route path="/translation" element={<TranslationPage />} />

                {/* Section */}
                <Route path="/section" element={<SectionPage />} />
                <Route path="/section/:id" element={<SectionDetails />} />
                <Route path="/section/create" element={<SectionCreatePage />} />
                <Route
                  path="/section/:id/edit"
                  element={<SectionEditPage isEdit={true} />}
                />
                <Route
                  path="/section/edit/:id"
                  element={<SectionEditPage isEdit={true} />}
                />
                <Route path="/section/view" element={<SectionDetails />} />
                {/* Activity Log */}
                <Route path="/activity-log" element={<ActivityLogPage />} />
                {/* Task Category */}
                <Route path="/task-category" element={<TaskCategoryPage />} />
                <Route
                  path="/task-category/:id"
                  element={<TaskCategoryDetails />}
                />
                <Route
                  path="/task-category/create"
                  element={<TaskCategoryCreatePage />}
                />
                <Route
                  path="/task-category/:id/edit"
                  element={<TaskCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/task-category/edit/:id"
                  element={<TaskCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/task-category/view"
                  element={<TaskCategoryDetails />}
                />
                {/* Sample Category */}
                <Route
                  path="/sample-category"
                  element={<SampleCategoryPage />}
                />
                <Route
                  path="/sample-category/:id"
                  element={<SampleCategoryDetails />}
                />
                <Route
                  path="/sample-category/create"
                  element={<SampleCategoryCreatePage />}
                />
                <Route
                  path="/sample-category/:id/edit"
                  element={<SampleCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/sample-category/edit/:id"
                  element={<SampleCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/sample-category/view"
                  element={<SampleCategoryDetails />}
                />
                {/* Sample Receiving */}
                <Route
                  path="/sample-receiving"
                  element={<SampleReceivingPage />}
                />
                <Route
                  path="/sample-receiving/:id"
                  element={<SampleReceivingDetails />}
                />
                <Route
                  path="/sample-receiving/create"
                  element={<SampleReceivingCreatePage />}
                />
                <Route
                  path="/sample-receiving/:id/edit"
                  element={<SampleReceivingEditPage isEdit={true} />}
                />
                <Route
                  path="/sample-receiving/edit/:id"
                  element={<SampleReceivingEditPage isEdit={true} />}
                />
                <Route
                  path="/sample-receiving/view"
                  element={<SampleReceivingDetails />}
                />
                {/* Task Assign */}
                <Route path="/task-assigns" element={<TaskAssignPage />} />
                <Route
                  path="/task-assigns/create"
                  element={<TaskAssignCreatePage isEdit={false} />}
                />
                <Route
                  path="/task-assigns/:id/edit"
                  element={<TaskAssignEditPage isEdit={true} />}
                />
                <Route
                  path="/task-assigns/edit/:id"
                  element={<TaskAssignEditPage isEdit={true} />}
                />
                <Route
                  path="/task-assigns/:id"
                  element={<TaskAssignDetails />}
                />
                <Route
                  path="/task-assigns/view"
                  element={<TaskAssignDetails />}
                />
                {/* Projects */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route
                  path="/projects/create"
                  element={<ProjectsCreatePage isEdit={false} />}
                />
                <Route
                  path="/projects/:id/edit"
                  element={<ProjectsEditPage isEdit={true} />}
                />
                <Route
                  path="/projects/edit/:id"
                  element={<ProjectsEditPage isEdit={true} />}
                />
                <Route path="/projects/:id" element={<ProjectsDetails />} />
                <Route path="/projects/view" element={<ProjectsDetails />} />
                {/* Project Type */}
                <Route path="/project-types" element={<ProjectTypePage />} />
                <Route
                  path="/project-types/create"
                  element={<ProjectTypeCreatePage />}
                />
                <Route
                  path="/project-types/:id/edit"
                  element={<ProjectTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/project-types/edit/:id"
                  element={<ProjectTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/project-types/:id"
                  element={<ProjectTypeDetails />}
                />
                <Route
                  path="/project-types/view"
                  element={<ProjectTypeDetails />}
                />
                {/* Project Type */}

                {/* terms */}
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/terms/create" element={<TermsCreatePage />} />
                <Route
                  path="/terms/:id/edit"
                  element={<TermsEditPage isEdit={true} />}
                />
                <Route
                  path="/terms/edit/:id"
                  element={<TermsEditPage isEdit={true} />}
                />
                <Route path="/terms/:id" element={<TermsDetails />} />
                <Route path="/terms/view" element={<TermsDetails />} />

                {/* Cash */}
                <Route path="/transfer-cash" element={<CashPage />} />
                <Route
                  path="/transfer-cash/create"
                  element={<CashCreatePage />}
                />
                <Route
                  path="/transfer-cash/:id/edit"
                  element={<CashEditPage isEdit={true} />}
                />
                <Route
                  path="/transfer-cash/edit/:id"
                  element={<CashEditPage isEdit={true} />}
                />
                <Route path="/transfer-cash/:id" element={<CashDetails />} />
                <Route path="/transfer-cash/view" element={<CashDetails />} />

                {/* Candidate Sortlists */}
                <Route
                  path="/candidate-sortlists"
                  element={<CandidateSortlistsPage />}
                />
                <Route
                  path="/candidate-sortlists/create"
                  element={<CandidateSortlistsCreatePage />}
                />
                <Route
                  path="/candidate-sortlists/:id/edit"
                  element={<CandidateSortlistsEditPage isEdit={true} />}
                />
                <Route
                  path="/candidate-sortlists/edit/:id"
                  element={<CandidateSortlistsEditPage isEdit={true} />}
                />
                <Route
                  path="/candidate-sortlists/:id"
                  element={<CandidateSortlistsDetails />}
                />
                <Route
                  path="/candidate-sortlists/view"
                  element={<CandidateSortlistsDetails />}
                />

                {/* Blood Groups */}
                <Route path="/blood-groups" element={<BloodGroupsPage />} />
                <Route
                  path="/blood-groups/create"
                  element={<BloodGroupsCreatePage />}
                />
                <Route
                  path="/blood-groups/:id/edit"
                  element={<BloodGroupsEditPage isEdit={true} />}
                />
                <Route
                  path="/blood-groups/edit/:id"
                  element={<BloodGroupsEditPage isEdit={true} />}
                />
                <Route
                  path="/blood-groups/:id"
                  element={<BloodGroupsDetails />}
                />
                <Route
                  path="/blood-groups/view"
                  element={<BloodGroupsDetails />}
                />

                {/* Unavailable Dates */}
                <Route
                  path="/unavailable-dates"
                  element={<UnavailableDatesPage />}
                />
                <Route
                  path="/unavailable-dates/create"
                  element={<UnavailableDatesCreatePage />}
                />
                <Route
                  path="/unavailable-dates/:id/edit"
                  element={<UnavailableDatesEditPage isEdit={true} />}
                />
                <Route
                  path="/unavailable-dates/edit/:id"
                  element={<UnavailableDatesEditPage isEdit={true} />}
                />
                <Route
                  path="/unavailable-dates/:id"
                  element={<UnavailableDatesDetails />}
                />
                <Route
                  path="/unavailable-dates/view"
                  element={<UnavailableDatesDetails />}
                />

                {/*  JOb locations */}
                <Route path="/job-locations" element={<JobLocationsPage />} />
                <Route
                  path="/job-locations/create"
                  element={<JobLocationsCreatePage />}
                />
                <Route
                  path="/job-locations/:id/edit"
                  element={<JobLocationsEditPage isEdit={true} />}
                />
                <Route
                  path="/job-locations/edit/:id"
                  element={<JobLocationsEditPage isEdit={true} />}
                />
                <Route
                  path="/job-locations/:id"
                  element={<JobLocationsDetails />}
                />
                <Route
                  path="/job-locations/view"
                  element={<JobLocationsDetails />}
                />

                {/*  Documents */}
                <Route path="/documents" element={<DocumentsPage />} />
                <Route
                  path="/documents/create"
                  element={<DocumentsCreatePage />}
                />
                <Route
                  path="/documents/:id/edit"
                  element={<DocumentsEditPage isEdit={true} />}
                />
                <Route
                  path="/documents/edit/:id"
                  element={<DocumentsEditPage isEdit={true} />}
                />
                <Route path="/documents/:id" element={<DocumentsDetails />} />
                <Route path="/documents/view" element={<DocumentsDetails />} />

                {/*   receive warehouse logistic */}
                <Route
                  path="/receive-warehouse-logistics"
                  element={<ReceiveWarehouseLogisticsPage />}
                />
                <Route
                  path="/receive-warehouse-logistics/:id"
                  element={<ReceiveWarehouseLogisticDetailsPage />}
                />
                <Route
                  path="/receive-warehouse-logistics/create"
                  element={<ReceiveWarehouseLogisticFormPage />}
                />
                <Route
                  path="/receive-warehouse-logistics/edit/:id"
                  element={<ReceiveWarehouseLogisticEditPage isEdit={true} />}
                />
                <Route
                  path="/receive-warehouse-logistics/view"
                  element={<ReceiveWarehouseLogisticDetailsPage />}
                />

                {/* expense-reports */}
                <Route
                  path="/expense-reports"
                  element={<ExpenseReportsPage />}
                />
                <Route
                  path="/expense-reports/create"
                  element={<ExpenseReportsCreatePage />}
                />
                <Route
                  path="/expense-reports/:id/edit"
                  element={<ExpenseReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-reports/edit/:id"
                  element={<ExpenseReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-reports/:id"
                  element={<ExpenseReportsDetails />}
                />
                <Route
                  path="/expense-reports/view"
                  element={<ExpenseReportsDetails />}
                />

                {/* supplier-items-report */}
                <Route
                  path="/supplier-items-report"
                  element={<SupplierItemsReportPage />}
                />
                <Route
                  path="/supplier-items-report/create"
                  element={<SupplierItemsReportCreatePage />}
                />
                <Route
                  path="/supplier-items-report/:id/edit"
                  element={<SupplierItemsReportEditPage isEdit={true} />}
                />
                <Route
                  path="/supplier-items-report/edit/:id"
                  element={<SupplierItemsReportEditPage isEdit={true} />}
                />
                <Route
                  path="/supplier-items-report/:id"
                  element={<SupplierItemsReportDetails />}
                />
                <Route
                  path="/supplier-items-report/view"
                  element={<SupplierItemsReportDetails />}
                />

                {/* bed */}
                <Route path="/bed" element={<BedPage />} />
                <Route path="/bed/create" element={<BedCreatePage />} />
                <Route
                  path="/bed/:id/edit"
                  element={<BedEditPage isEdit={true} />}
                />
                <Route
                  path="/bed/edit/:id"
                  element={<BedEditPage isEdit={true} />}
                />
                <Route path="/bed/:id" element={<BedDetails />} />
                <Route path="/bed/view" element={<BedDetails />} />

                {/* bed-assign */}
                <Route path="/bed-assign" element={<BedAssignPage />} />
                <Route
                  path="/bed-assign/create"
                  element={<BedAssignCreatePage />}
                />
                <Route
                  path="/bed-assign/:id/edit"
                  element={<BedAssignEditPage isEdit={true} />}
                />
                <Route
                  path="/bed-assign/edit/:id"
                  element={<BedAssignEditPage isEdit={true} />}
                />
                <Route path="/bed-assign/:id" element={<BedAssignDetails />} />
                <Route path="/bed-assign/view" element={<BedAssignDetails />} />

                {/* bed-reports */}
                <Route path="/bed-reports" element={<BedReportsPage />} />
                <Route
                  path="/bed-reports/create"
                  element={<BedReportsCreatePage />}
                />
                <Route
                  path="/bed-reports/:id/edit"
                  element={<BedReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/bed-reports/edit/:id"
                  element={<BedReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/bed-reports/:id"
                  element={<BedReportsDetails />}
                />
                <Route
                  path="/bed-reports/view"
                  element={<BedReportsDetails />}
                />

                {/* bed-transfer */}
                <Route path="/bed-transfer" element={<BedTransferPage />} />
                <Route
                  path="/bed-transfer/create"
                  element={<BedTransferCreatePage />}
                />
                <Route
                  path="/bed-transfer/:id/edit"
                  element={<BedTransferEditPage isEdit={true} />}
                />
                <Route
                  path="/bed-transfer/edit/:id"
                  element={<BedTransferEditPage isEdit={true} />}
                />
                <Route
                  path="/bed-transfer/:id"
                  element={<BedTransferDetails />}
                />
                <Route
                  path="/bed-transfer/view"
                  element={<BedTransferDetails />}
                />

                {/*  Goods */}
                <Route path="/goods" element={<GoodsPage />} />
                <Route path="/goods/create" element={<GoodsCreatePage />} />
                <Route
                  path="/goods/:id/edit"
                  element={<GoodsEditPage isEdit={true} />}
                />
                <Route
                  path="/goods/edit/:id"
                  element={<GoodsEditPage isEdit={true} />}
                />
                <Route path="/goods/:id" element={<GoodsDetails />} />
                <Route path="/goods/view" element={<GoodsDetails />} />

                {/* Campaigns */}
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route
                  path="/campaigns/create"
                  element={<CampaignsCreatePage />}
                />
                <Route
                  path="/campaigns/:id/edit"
                  element={<CampaignsEditPage isEdit={true} />}
                />
                <Route
                  path="/campaigns/edit/:id"
                  element={<CampaignsEditPage isEdit={true} />}
                />
                <Route path="/campaigns/:id" element={<CampaignsDetails />} />
                <Route path="/campaigns/view" element={<CampaignsDetails />} />

                {/* accessories */}
                <Route path="/accessories" element={<AccessoriesPage />} />
                <Route
                  path="/accessories/create"
                  element={<AccessoriesCreatePage />}
                />
                <Route
                  path="/accessories/:id/edit"
                  element={<AccessoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/accessories/edit/:id"
                  element={<AccessoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/accessories/:id"
                  element={<AccessoriesDetails />}
                />
                <Route
                  path="/accessories/view"
                  element={<AccessoriesDetails />}
                />

                {/* work-centers */}
                <Route path="/work-centers" element={<WorkCentersPage />} />
                <Route
                  path="/work-centers/create"
                  element={<WorkCentersCreatePage />}
                />
                <Route
                  path="/work-centers/:id/edit"
                  element={<WorkCentersEditPage isEdit={true} />}
                />
                <Route
                  path="/work-centers/edit/:id"
                  element={<WorkCentersEditPage isEdit={true} />}
                />
                <Route
                  path="/work-centers/:id"
                  element={<WorkCentersDetails />}
                />
                <Route
                  path="/work-centers/view"
                  element={<WorkCentersDetails />}
                />

                {/* shortcut */}
                <Route path="/shortcut" element={<ShortcutPage />} />
                <Route
                  path="/shortcut/create"
                  element={<ShortcutCreatePage />}
                />
                <Route
                  path="/shortcut/:id/edit"
                  element={<ShortcutEditPage isEdit={true} />}
                />
                <Route
                  path="/shortcut/edit/:id"
                  element={<ShortcutEditPage isEdit={true} />}
                />
                <Route path="/shortcut/:id" element={<ShortcutDetails />} />
                <Route path="/shortcut/view" element={<ShortcutDetails />} />

                {/* consumables */}
                <Route path="/consumables" element={<ConsumablesPage />} />
                <Route
                  path="/consumables/create"
                  element={<ConsumablesCreatePage />}
                />
                <Route
                  path="/consumables/:id/edit"
                  element={<ConsumablesEditPage isEdit={true} />}
                />
                <Route
                  path="/consumables/edit/:id"
                  element={<ConsumablesEditPage isEdit={true} />}
                />
                <Route
                  path="/consumables/:id"
                  element={<ConsumablesDetails />}
                />
                <Route
                  path="/consumables/view"
                  element={<ConsumablesDetails />}
                />

                {/*  Courier */}
                <Route path="/courier" element={<CourierPage />} />
                <Route path="/courier/create" element={<CourierCreatePage />} />
                <Route
                  path="/courier/:id/edit"
                  element={<CourierEditPage isEdit={true} />}
                />
                <Route
                  path="/courier/edit/:id"
                  element={<CourierEditPage isEdit={true} />}
                />
                <Route path="/courier/:id" element={<CourierDetails />} />
                <Route path="/courier/view" element={<CourierDetails />} />

                {/*   Vehicles */}
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route
                  path="/vehicles/create"
                  element={<VehiclesCreatePage />}
                />
                <Route
                  path="/vehicles/:id/edit"
                  element={<VehiclesEditPage isEdit={true} />}
                />
                <Route
                  path="/vehicles/edit/:id"
                  element={<VehiclesEditPage isEdit={true} />}
                />
                <Route path="/vehicles/:id" element={<VehiclesDetails />} />
                <Route path="/vehicles/view" element={<VehiclesDetails />} />

                {/*   Fuels */}
                <Route path="/fuels" element={<FuelsPage />} />
                <Route path="/fuels/create" element={<FuelsCreatePage />} />
                <Route
                  path="/fuels/:id/edit"
                  element={<FuelsEditPage isEdit={true} />}
                />
                <Route
                  path="/fuels/edit/:id"
                  element={<FuelsEditPage isEdit={true} />}
                />
                <Route path="/fuels/:id" element={<FuelsDetails />} />
                <Route path="/fuels/view" element={<FuelsDetails />} />

                {/*   Parts */}
                <Route path="/parts" element={<PartsPage />} />
                <Route path="/parts/create" element={<PartsCreatePage />} />
                <Route
                  path="/parts/:id/edit"
                  element={<PartsEditPage isEdit={true} />}
                />
                <Route
                  path="/parts/edit/:id"
                  element={<PartsEditPage isEdit={true} />}
                />
                <Route path="/parts/:id" element={<PartsDetails />} />
                <Route path="/parts/view" element={<PartsDetails />} />

                {/* Rental Requests */}
                <Route
                  path="/rental-requests"
                  element={<RentalRequestsPage />}
                />
                <Route
                  path="/rental-requests/create"
                  element={<RentalRequestsCreatePage />}
                />
                <Route
                  path="/rental-requests/:id/edit"
                  element={<RentalRequestsEditPage isEdit={true} />}
                />
                <Route
                  path="/rental-requests/edit/:id"
                  element={<RentalRequestsEditPage isEdit={true} />}
                />
                <Route
                  path="/rental-requests/:id"
                  element={<RentalRequestsDetails />}
                />
                <Route
                  path="/rental-requests/view"
                  element={<RentalRequestsDetails />}
                />

                {/* sliders */}
                <Route path="/sliders" element={<SlidersPage />} />
                <Route path="/sliders/create" element={<SlidersCreatePage />} />
                <Route
                  path="/sliders/:id/edit"
                  element={<SlidersEditPage isEdit={true} />}
                />
                <Route
                  path="/sliders/edit/:id"
                  element={<SlidersEditPage isEdit={true} />}
                />
                <Route path="/sliders/:id" element={<SlidersDetails />} />
                <Route path="/sliders/view" element={<SlidersDetails />} />

                {/* blog */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/create" element={<BlogCreatePage />} />
                <Route
                  path="/blog/:id/edit"
                  element={<BlogEditPage isEdit={true} />}
                />
                <Route
                  path="/blog/edit/:id"
                  element={<BlogEditPage isEdit={true} />}
                />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/blog/view" element={<BlogDetails />} />

                {/* Beds */}
                <Route path="/beds" element={<BedsPage />} />
                <Route path="/beds/create" element={<BedsCreatePage />} />
                <Route
                  path="/beds/:id/edit"
                  element={<BedsEditPage isEdit={true} />}
                />
                <Route
                  path="/beds/edit/:id"
                  element={<BedsEditPage isEdit={true} />}
                />
                <Route path="/beds/:id" element={<BedsDetails />} />
                <Route path="/beds/view" element={<BedsDetails />} />

                {/* Wake Up Calls */}
                <Route path="/wake-up-calls" element={<WakeUpCallsPage />} />
                <Route
                  path="/wake-up-calls/create"
                  element={<WakeUpCallsCreatePage />}
                />
                <Route
                  path="/wake-up-calls/:id/edit"
                  element={<WakeUpCallsEditPage isEdit={true} />}
                />
                <Route
                  path="/wake-up-calls/edit/:id"
                  element={<WakeUpCallsEditPage isEdit={true} />}
                />
                <Route
                  path="/wake-up-calls/:id"
                  element={<WakeUpCallsDetails />}
                />
                <Route
                  path="/wake-up-calls/view"
                  element={<WakeUpCallsDetails />}
                />

                {/* Award Lists */}
                <Route path="/award-lists" element={<AwardListsPage />} />
                <Route
                  path="/award-lists/create"
                  element={<AwardListsCreatePage />}
                />
                <Route
                  path="/award-lists/:id/edit"
                  element={<AwardListsEditPage isEdit={true} />}
                />
                <Route
                  path="/award-lists/edit/:id"
                  element={<AwardListsEditPage isEdit={true} />}
                />
                <Route
                  path="/award-lists/:id"
                  element={<AwardListsDetails />}
                />
                <Route
                  path="/award-lists/view"
                  element={<AwardListsDetails />}
                />

                {/* Notice Boards */}
                <Route path="/notice-boards" element={<NoticeBoardsPage />} />
                <Route
                  path="/notice-boards/create"
                  element={<NoticeBoardsCreatePage />}
                />
                <Route
                  path="/notice-boards/:id/edit"
                  element={<NoticeBoardsEditPage isEdit={true} />}
                />
                <Route
                  path="/notice-boards/edit/:id"
                  element={<NoticeBoardsEditPage isEdit={true} />}
                />
                <Route
                  path="/notice-boards/:id"
                  element={<NoticeBoardsDetails />}
                />
                <Route
                  path="/notice-boards/view"
                  element={<NoticeBoardsDetails />}
                />

                {/* Training Programs */}
                <Route
                  path="/training-programs"
                  element={<TrainingProgramsPage />}
                />
                <Route
                  path="/training-programs/create"
                  element={<TrainingProgramsCreatePage />}
                />
                <Route
                  path="/training-programs/:id/edit"
                  element={<TrainingProgramsEditPage isEdit={true} />}
                />
                <Route
                  path="/training-programs/edit/:id"
                  element={<TrainingProgramsEditPage isEdit={true} />}
                />
                <Route
                  path="/training-programs/:id"
                  element={<TrainingProgramsDetails />}
                />
                <Route
                  path="/training-programs/view"
                  element={<TrainingProgramsDetails />}
                />

                {/* Warranties */}
                <Route path="/warranties" element={<WarrantiesPage />} />
                <Route
                  path="/warranties/create"
                  element={<WarrantiesCreatePage />}
                />
                <Route
                  path="/warranties/:id/edit"
                  element={<WarrantiesEditPage isEdit={true} />}
                />
                <Route
                  path="/warranties/edit/:id"
                  element={<WarrantiesEditPage isEdit={true} />}
                />
                <Route path="/warranties/:id" element={<WarrantiesDetails />} />
                <Route
                  path="/warranties/view"
                  element={<WarrantiesDetails />}
                />

                {/* Audits */}
                <Route path="/audits" element={<AuditsPage />} />
                <Route path="/audits/create" element={<AuditsCreatePage />} />
                <Route
                  path="/audits/:id/edit"
                  element={<AuditsEditPage isEdit={true} />}
                />
                <Route
                  path="/audits/edit/:id"
                  element={<AuditsEditPage isEdit={true} />}
                />
                <Route path="/audits/:id" element={<AuditsDetails />} />
                <Route path="/audits/view" element={<AuditsDetails />} />

                {/* bills of materials */}
                <Route
                  path="/bills-of-materials"
                  element={<BillsOfMaterialsPage />}
                />
                <Route
                  path="/bills-of-materials/create"
                  element={<BillsOfMaterialsCreatePage />}
                />
                <Route
                  path="/bills-of-materials/:id/edit"
                  element={<BillsOfMaterialsEditPage isEdit={true} />}
                />
                <Route
                  path="/bills-of-materials/edit/:id"
                  element={<BillsOfMaterialsEditPage isEdit={true} />}
                />
                <Route
                  path="/bills-of-materials/:id"
                  element={<BillsOfMaterialsDetails />}
                />
                <Route
                  path="/bills-of-materials/view"
                  element={<BillsOfMaterialsDetails />}
                />

                {/* plans */}
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/plans/create" element={<PlansCreatePage />} />
                <Route
                  path="/plans/:id/edit"
                  element={<PlansEditPage isEdit={true} />}
                />
                <Route
                  path="/plans/edit/:id"
                  element={<PlansEditPage isEdit={true} />}
                />
                <Route path="/plans/:id" element={<PlansDetails />} />
                <Route path="/plans/view" element={<PlansDetails />} />

                {/* expense sub categories */}
                <Route
                  path="/expense-sub-categories"
                  element={<ExpenseSubCategoriesPage />}
                />
                <Route
                  path="/expense-sub-categories/create"
                  element={<ExpenseSubCategoriesCreatePage />}
                />
                <Route
                  path="/expense-sub-categories/:id/edit"
                  element={<ExpenseSubCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-sub-categories/edit/:id"
                  element={<ExpenseSubCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-sub-categories/:id"
                  element={<ExpenseSubCategoriesDetails />}
                />
                <Route
                  path="/expense-sub-categories/view"
                  element={<ExpenseSubCategoriesDetails />}
                />

                {/* expense categories */}
                <Route
                  path="/expense-categories"
                  element={<ExpenseCategoriesPage />}
                />
                <Route
                  path="/expense-categories/create"
                  element={<ExpenseCategoriesCreatePage />}
                />
                <Route
                  path="/expense-categories/:id/edit"
                  element={<ExpenseCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-categories/edit/:id"
                  element={<ExpenseCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/expense-categories/:id"
                  element={<ExpenseCategoriesDetails />}
                />
                <Route
                  path="/expense-categories/view"
                  element={<ExpenseCategoriesDetails />}
                />

                {/* ticket status */}
                <Route path="/ticket-status" element={<TicketStatusPage />} />
                <Route
                  path="/ticket-status/create"
                  element={<TicketStatusCreatePage />}
                />
                <Route
                  path="/ticket-status/:id/edit"
                  element={<TicketStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/ticket-status/edit/:id"
                  element={<TicketStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/ticket-status/:id"
                  element={<TicketStatusDetails />}
                />
                <Route
                  path="/ticket-status/view"
                  element={<TicketStatusDetails />}
                />

                {/* notice */}
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/notice/create" element={<NoticeCreatePage />} />
                <Route
                  path="/notice/:id/edit"
                  element={<NoticeEditPage isEdit={true} />}
                />
                <Route
                  path="/notice/edit/:id"
                  element={<NoticeEditPage isEdit={true} />}
                />
                <Route path="/notice/:id" element={<NoticeDetails />} />
                <Route path="/notice/view" element={<NoticeDetails />} />

                {/* company */}
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/company/create" element={<CompanyCreatePage />} />
                <Route
                  path="/company/:id/edit"
                  element={<CompanyEditPage isEdit={true} />}
                />
                <Route
                  path="/company/edit/:id"
                  element={<CompanyEditPage isEdit={true} />}
                />
                <Route path="/company/:id" element={<CompanyDetails />} />
                <Route path="/company/view" element={<CompanyDetails />} />

                {/* company loans */}
                <Route path="/company-loans" element={<CompanyLoansPage />} />
                <Route
                  path="/company-loans/create"
                  element={<CompanyLoansCreatePage />}
                />
                <Route
                  path="/company-loans/:id/edit"
                  element={<CompanyLoansEditPage isEdit={true} />}
                />
                <Route
                  path="/company-loans/edit/:id"
                  element={<CompanyLoansEditPage isEdit={true} />}
                />
                <Route
                  path="/company-loans/:id"
                  element={<CompanyLoansDetails />}
                />
                <Route
                  path="/company-loans/view"
                  element={<CompanyLoansDetails />}
                />

                {/* advance payment */}
                <Route
                  path="/advance-payment"
                  element={<AdvancePaymentPage />}
                />
                <Route
                  path="/advance-payment/create"
                  element={<AdvancePaymentCreatePage />}
                />
                <Route
                  path="/advance-payment/:id/edit"
                  element={<AdvancePaymentEditPage isEdit={true} />}
                />
                <Route
                  path="/advance-payment/edit/:id"
                  element={<AdvancePaymentEditPage isEdit={true} />}
                />
                <Route
                  path="/advance-payment/:id"
                  element={<AdvancePaymentDetails />}
                />
                <Route
                  path="/advance-payment/view"
                  element={<AdvancePaymentDetails />}
                />

                {/* patient admission */}
                <Route
                  path="/patient-admission"
                  element={<PatientAdmissionPage />}
                />
                <Route
                  path="/patient-admission/create"
                  element={<PatientAdmissionCreatePage />}
                />
                <Route
                  path="/patient-admission/:id/edit"
                  element={<PatientAdmissionEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-admission/edit/:id"
                  element={<PatientAdmissionEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-admission/:id"
                  element={<PatientAdmissionDetails />}
                />
                <Route
                  path="/patient-admission/view"
                  element={<PatientAdmissionDetails />}
                />

                {/* medicine category */}
                <Route
                  path="/medicine-category"
                  element={<MedicineCategoryPage />}
                />
                <Route
                  path="/medicine-category/create"
                  element={<MedicineCategoryCreatePage />}
                />
                <Route
                  path="/medicine-category/:id/edit"
                  element={<MedicineCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/medicine-category/edit/:id"
                  element={<MedicineCategoryEditPage isEdit={true} />}
                />
                <Route
                  path="/medicine-category/:id"
                  element={<MedicineCategoryDetails />}
                />
                <Route
                  path="/medicine-category/view"
                  element={<MedicineCategoryDetails />}
                />

                {/* cprofit-loss */}
                <Route path="/profit-loss" element={<ProfitLossPage />} />

                {/* current-stock-reports */}
                <Route
                  path="/current-stock-reports"
                  element={<CurrentStockReportsPage />}
                />
                {/* sales-item-reports */}
                <Route
                  path="/sales-item-reports"
                  element={<SalesItemReportsPage />}
                />
                {/* salesman-sales-reports */}
                <Route
                  path="/salesman-sales-reports"
                  element={<SalesmanSalesReportsPage />}
                />

                {/* SubscribePage */}
                <Route path="/subscribe" element={<SubscribePage />} />

                {/* prescription */}
                <Route path="/prescription" element={<PrescriptionPage />} />

                {/* medication-reports */}
                <Route
                  path="/medication-reports"
                  element={<MedicationReportsPage />}
                />

                {/* visiting-reports */}
                <Route
                  path="/visiting-reports"
                  element={<VisitingReportsPage />}
                />

                {/* Purchase Return Report */}
                <Route
                  path="/purchase-return-reports"
                  element={<PurchaseReturnReportsPage />}
                />

                {/* purchase-tax-reports */}
                <Route
                  path="/purchase-tax-reports"
                  element={<PurchaseTaxReportsPage />}
                />

                {/* purchase-reports */}
                <Route
                  path="/purchase-reports"
                  element={<PurchaseReportsPage />}
                />

                {/* sales-reports */}
                <Route path="/sales-reports" element={<SalesReportsPage />} />

                {/* revokes */}
                <Route path="/revokes" element={<RevokesPage />} />

                {/* sales-return-reports */}
                <Route
                  path="/sales-return-reports"
                  element={<SalesReturnReportsPage />}
                />

                {/* sales-tax-reports */}
                <Route
                  path="/sales-tax-reports"
                  element={<SalesTaxReportsPage />}
                />

                {/* Tiet Priorities */}
                <Route
                  path="/ticket-priorities"
                  element={<TicketPrioritiesPage />}
                />
                <Route
                  path="/ticket-priorities/create"
                  element={<TicketPrioritiesCreatePage />}
                />
                <Route
                  path="/ticket-priorities/:id/edit"
                  element={<TicketPrioritiesEditPage isEdit={true} />}
                />
                <Route
                  path="/ticket-priorities/edit/:id"
                  element={<TicketPrioritiesEditPage isEdit={true} />}
                />
                <Route
                  path="/ticket-priorities/:id"
                  element={<TicketPrioritiesDetails />}
                />
                <Route
                  path="/ticket-priorities/view"
                  element={<TicketPrioritiesDetails />}
                />

                {/* Garages */}
                <Route path="/garages" element={<GaragesPage />} />
                <Route path="/garages/create" element={<GaragesCreatePage />} />
                <Route
                  path="/garages/:id/edit"
                  element={<GaragesEditPage isEdit={true} />}
                />
                <Route
                  path="/garages/edit/:id"
                  element={<GaragesEditPage isEdit={true} />}
                />
                <Route path="/garages/:id" element={<GaragesDetails />} />
                <Route path="/garages/view" element={<GaragesDetails />} />

                {/* predefined replies */}
                <Route
                  path="/predefined-replies"
                  element={<PredefinedRepliesPage />}
                />
                <Route
                  path="/predefined-replies/create"
                  element={<PredefinedRepliesCreatePage />}
                />
                <Route
                  path="/predefined-replies/:id/edit"
                  element={<PredefinedRepliesEditPage isEdit={true} />}
                />
                <Route
                  path="/predefined-replies/edit/:id"
                  element={<PredefinedRepliesEditPage isEdit={true} />}
                />
                <Route
                  path="/predefined-replies/:id"
                  element={<PredefinedRepliesDetails />}
                />
                <Route
                  path="/predefined-replies/view"
                  element={<PredefinedRepliesDetails />}
                />

                {/* bonus type */}
                <Route path="/bonus-type" element={<BonusTypePage />} />
                <Route
                  path="/bonus-type/create"
                  element={<BonusTypeCreatePage />}
                />
                <Route
                  path="/bonus-type/:id/edit"
                  element={<BonusTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/bonus-type/edit/:id"
                  element={<BonusTypeEditPage isEdit={true} />}
                />
                <Route path="/bonus-type/:id" element={<BonusTypeDetails />} />
                <Route path="/bonus-type/view" element={<BonusTypeDetails />} />

                {/* salary sheet */}
                <Route path="/salary-sheet" element={<SalarySheetPage />} />
                <Route
                  path="/salary-sheet/create"
                  element={<SalarySheetCreatePage />}
                />
                <Route
                  path="/salary-sheet/:id/edit"
                  element={<SalarySheetEditPage isEdit={true} />}
                />
                <Route
                  path="/salary-sheet/edit/:id"
                  element={<SalarySheetEditPage isEdit={true} />}
                />
                <Route
                  path="/salary-sheet/:id"
                  element={<SalarySheetDetails />}
                />
                <Route
                  path="/salary-sheet/view"
                  element={<SalarySheetDetails />}
                />

                {/* Financial Year Ending */}
                <Route
                  path="/financial-year-ending"
                  element={<FinancialYearEndingPage />}
                />

                {/* Warranty Information */}
                <Route
                  path="/warranty-information"
                  element={<WarrantyInformationPage />}
                />

                {/* Employee Performances */}
                <Route
                  path="/employee-performances"
                  element={<EmployeePerformancesPage />}
                />
                <Route
                  path="/employee-performances/create"
                  element={<EmployeePerformancesCreatePage />}
                />
                <Route
                  path="/employee-performances/:id/edit"
                  element={<EmployeePerformancesEditPage isEdit={true} />}
                />
                <Route
                  path="/employee-performances/edit/:id"
                  element={<EmployeePerformancesEditPage isEdit={true} />}
                />
                <Route
                  path="/employee-performances/:id"
                  element={<EmployeePerformancesDetails />}
                />
                <Route
                  path="/employee-performances/view"
                  element={<EmployeePerformancesDetails />}
                />

                {/* Property Owner */}
                <Route path="/property-owner" element={<PropertyOwnerPage />} />
                <Route
                  path="/property-owner/create"
                  element={<PropertyOwnerCreatePage />}
                />
                <Route
                  path="/property-owner/:id/edit"
                  element={<PropertyOwnerEditPage isEdit={true} />}
                />
                <Route
                  path="/property-owner/edit/:id"
                  element={<PropertyOwnerEditPage isEdit={true} />}
                />
                <Route
                  path="/property-owner/:id"
                  element={<PropertyOwnerDetails />}
                />
                <Route
                  path="/property-owner/view"
                  element={<PropertyOwnerDetails />}
                />

                {/* Property */}
                <Route path="/property" element={<PropertyPage />} />
                <Route
                  path="/property/create"
                  element={<PropertyCreatePage />}
                />
                <Route
                  path="/property/:id/edit"
                  element={<PropertyEditPage isEdit={true} />}
                />
                <Route
                  path="/property/edit/:id"
                  element={<PropertyEditPage isEdit={true} />}
                />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/property/view" element={<PropertyDetails />} />

                {/*  Property Approval */}
                <Route
                  path="/property-approval"
                  element={<PropertyApprovalPage />}
                />
                <Route
                  path="/property-approval/create"
                  element={<PropertyApprovalCreatePage />}
                />
                <Route
                  path="/property-approval/:id/edit"
                  element={<PropertyApprovalEditPage isEdit={true} />}
                />
                <Route
                  path="/property-approval/edit/:id"
                  element={<PropertyApprovalEditPage isEdit={true} />}
                />
                <Route
                  path="/property-approval/:id"
                  element={<PropertyApprovalDetails />}
                />
                <Route
                  path="/property-approval/view"
                  element={<PropertyApprovalDetails />}
                />

                {/*  received-voucher */}
                <Route
                  path="/received-voucher"
                  element={<ReceivedVoucherPage />}
                />
                <Route
                  path="/received-voucher/create"
                  element={<ReceivedVoucherCreatePage />}
                />
                <Route
                  path="/received-voucher/:id/edit"
                  element={<ReceivedVoucherEditPage isEdit={true} />}
                />
                <Route
                  path="/received-voucher/edit/:id"
                  element={<ReceivedVoucherEditPage isEdit={true} />}
                />
                <Route
                  path="/received-voucher/:id"
                  element={<ReceivedVoucherDetails />}
                />
                <Route
                  path="/received-voucher/view"
                  element={<ReceivedVoucherDetails />}
                />

                {/* tickets */}
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/tickets/create" element={<TicketsCreatePage />} />
                <Route
                  path="/tickets/:id/edit"
                  element={<TicketsEditPage isEdit={true} />}
                />
                <Route
                  path="/tickets/edit/:id"
                  element={<TicketsEditPage isEdit={true} />}
                />
                <Route path="/tickets/:id" element={<TicketsDetails />} />
                <Route path="/tickets/view" element={<TicketsDetails />} />

                {/* project-contract-type */}
                <Route
                  path="/project-contract-type"
                  element={<ProjectContractTypePage />}
                />
                <Route
                  path="/project-contract-type/create"
                  element={<ProjectContractTypeCreatePage />}
                />
                <Route
                  path="/project-contract-type/:id/edit"
                  element={<ProjectContractTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/project-contract-type/edit/:id"
                  element={<ProjectContractTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/project-contract-type/:id"
                  element={<ProjectContractTypeDetails />}
                />
                <Route
                  path="/project-contract-type/view"
                  element={<ProjectContractTypeDetails />}
                />

                {/* Tenant */}
                <Route path="/tenant" element={<TenantPage />} />

                {/* Depreciations */}
                <Route path="/depreciations" element={<DepreciationsPage />} />

                {/*  Expenses */}
                <Route path="/expenses" element={<ExpensesPage />} />
                <Route
                  path="/expenses/create"
                  element={<ExpensesCreatePage />}
                />
                <Route
                  path="/expenses/:id/edit"
                  element={<ExpensesEditPage isEdit={true} />}
                />
                <Route
                  path="/expenses/edit/:id"
                  element={<ExpensesEditPage isEdit={true} />}
                />
                <Route path="/expenses/:id" element={<ExpensesDetails />} />
                <Route path="/expenses/view" element={<ExpensesDetails />} />

                {/* Deductions */}
                <Route path="/deductions" element={<DeductionsPage />} />
                <Route
                  path="/deductions/create"
                  element={<DeductionsCreatePage />}
                />
                <Route
                  path="/deductions/:id/edit"
                  element={<DeductionsEditPage isEdit={true} />}
                />
                <Route
                  path="/deductions/edit/:id"
                  element={<DeductionsEditPage isEdit={true} />}
                />
                <Route path="/deductions/:id" element={<DeductionsDetails />} />
                <Route
                  path="/deductions/view"
                  element={<DeductionsDetails />}
                />

                {/* Allowances */}
                <Route path="/allowances" element={<AllowancesPage />} />
                <Route
                  path="/allowances/create"
                  element={<AllowancesCreatePage />}
                />
                <Route
                  path="/allowances/:id/edit"
                  element={<AllowancesEditPage isEdit={true} />}
                />
                <Route
                  path="/allowances/edit/:id"
                  element={<AllowancesEditPage isEdit={true} />}
                />
                <Route path="/allowances/:id" element={<AllowancesDetails />} />
                <Route
                  path="/allowances/view"
                  element={<AllowancesDetails />}
                />

                {/* Loans */}
                <Route path="/loans" element={<LoansPage />} />
                <Route path="/loans/create" element={<LoansCreatePage />} />
                <Route
                  path="/loans/:id/edit"
                  element={<LoansEditPage isEdit={true} />}
                />
                <Route
                  path="/loans/edit/:id"
                  element={<LoansEditPage isEdit={true} />}
                />
                <Route path="/loans/:id" element={<LoansDetails />} />
                <Route path="/loans/view" element={<LoansDetails />} />

                {/* Leaves */}
                <Route path="/leaves" element={<LeavesPage />} />
                <Route path="/leaves/:id" element={<LeavesDetails />} />
                <Route path="/leaves/create" element={<LeavesCreatePage />} />
                <Route
                  path="/leaves/:id/edit"
                  element={<LeavesEditPage isEdit={true} />}
                />
                <Route
                  path="/leaves/edit/:id"
                  element={<LeavesEditPage isEdit={true} />}
                />
                <Route path="/leaves/view" element={<LeavesDetails />} />
                {/* Appointment */}
                <Route path="/appointments" element={<AppointmentPage />} />
                <Route
                  path="/appointments/:id"
                  element={<AppointmentDetails />}
                />
                <Route
                  path="/appointments/create"
                  element={<AppointmentCreatePage />}
                />
                <Route
                  path="/appointments/:id/edit"
                  element={<AppointmentEditPage isEdit={true} />}
                />
                <Route
                  path="/appointments/edit/:id"
                  element={<AppointmentEditPage isEdit={true} />}
                />
                <Route
                  path="/appointments/view"
                  element={<AppointmentDetails />}
                />
                {/* Leaves Application */}
                <Route
                  path="/leaves-application"
                  element={<LeavesApplicationPage />}
                />
                <Route
                  path="/leaves-application/:id"
                  element={<LeavesApplicationDetails />}
                />
                <Route
                  path="/leaves-application/create"
                  element={<LeavesApplicationCreatePage />}
                />
                <Route
                  path="/leaves-application/:id/edit"
                  element={<LeavesApplicationEditPage isEdit={true} />}
                />
                <Route
                  path="/leaves-application/edit/:id"
                  element={<LeavesApplicationEditPage isEdit={true} />}
                />
                <Route
                  path="/leaves-application/view"
                  element={<LeavesApplicationDetails />}
                />
                {/* Salary Advance */}
                <Route path="/salary-advance" element={<SalaryAdvancePage />} />
                <Route
                  path="/salary-advance/:id"
                  element={<SalaryAdvanceDetails />}
                />
                <Route
                  path="/salary-advance/create"
                  element={<SalaryAdvanceCreatePage />}
                />
                <Route
                  path="/salary-advance/:id/edit"
                  element={<SalaryAdvanceEditPage isEdit={true} />}
                />
                <Route
                  path="/salary-advance/edit/:id"
                  element={<SalaryAdvanceEditPage isEdit={true} />}
                />
                <Route
                  path="/salary-advance/view"
                  element={<SalaryAdvanceDetails />}
                />

                {/* Bonus */}
                <Route path="/bonus" element={<BonusPage />} />
                <Route path="/bonus/:id" element={<BonusDetails />} />
                <Route path="/bonus/create" element={<BonusCreatePage />} />
                <Route
                  path="/bonus/:id/edit"
                  element={<BonusEditPage isEdit={true} />}
                />
                <Route
                  path="/bonus/edit/:id"
                  element={<BonusEditPage isEdit={true} />}
                />
                <Route path="/bonus/view" element={<BonusDetails />} />

                {/* Termination */}
                <Route path="/termination" element={<TerminationPage />} />
                <Route
                  path="/termination/:id"
                  element={<TerminationDetails />}
                />
                <Route
                  path="/termination/create"
                  element={<TerminationCreatePage />}
                />
                <Route
                  path="/termination/:id/edit"
                  element={<TerminationEditPage isEdit={true} />}
                />
                <Route
                  path="/termination/edit/:id"
                  element={<TerminationEditPage isEdit={true} />}
                />
                <Route
                  path="/termination/view"
                  element={<TerminationDetails />}
                />

                {/* Employee Contract */}
                <Route
                  path="/employee-contract"
                  element={<EmployeeContractPage />}
                />
                <Route
                  path="/employee-contract/:id"
                  element={<EmployeeContractDetails />}
                />
                <Route
                  path="/employee-contract/create"
                  element={<EmployeeContractCreatePage />}
                />
                <Route
                  path="/employee-contract/:id/edit"
                  element={<EmployeeContractEditPage isEdit={true} />}
                />
                <Route
                  path="/employee-contract/edit/:id"
                  element={<EmployeeContractEditPage isEdit={true} />}
                />
                <Route
                  path="/employee-contract/view"
                  element={<EmployeeContractDetails />}
                />

                {/* Repair Jobs */}
                <Route path="/repair-jobs" element={<RepairJobsPage />} />
                <Route
                  path="/repair-jobs/:id"
                  element={<RepairJobsDetails />}
                />
                <Route
                  path="/repair-jobs/create"
                  element={<RepairJobsCreatePage />}
                />
                <Route
                  path="/repair-jobs/:id/edit"
                  element={<RepairJobsEditPage isEdit={true} />}
                />
                <Route
                  path="/repair-jobs/edit/:id"
                  element={<RepairJobsEditPage isEdit={true} />}
                />
                <Route
                  path="/repair-jobs/view"
                  element={<RepairJobsDetails />}
                />

                {/* Transfer */}
                <Route path="/transfer" element={<TransferPage />} />
                <Route path="/transfer/:id" element={<TransferDetails />} />
                <Route
                  path="/transfer/create"
                  element={<TransferCreatePage />}
                />
                <Route
                  path="/transfer/:id/edit"
                  element={<TransferEditPage isEdit={true} />}
                />
                <Route
                  path="/transfer/edit/:id"
                  element={<TransferEditPage isEdit={true} />}
                />
                <Route path="/transfer/view" element={<TransferDetails />} />

                {/* Interview */}
                <Route path="/interview" element={<InterviewPage />} />
                <Route path="/interview/:id" element={<InterviewDetails />} />
                <Route
                  path="/interview/create"
                  element={<InterviewCreatePage />}
                />
                <Route
                  path="/interview/:id/edit"
                  element={<InterviewEditPage isEdit={true} />}
                />
                <Route
                  path="/interview/edit/:id"
                  element={<InterviewEditPage isEdit={true} />}
                />
                <Route path="/interview/view" element={<InterviewDetails />} />

                {/* Contact Type */}
                <Route path="/contact-type" element={<ContactTypePage />} />
                <Route
                  path="/contact-type/:id"
                  element={<ContactTypeDetails />}
                />
                <Route
                  path="/contact-type/create"
                  element={<ContactTypeCreatePage />}
                />
                <Route
                  path="/contact-type/:id/edit"
                  element={<ContactTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/contact-type/edit/:id"
                  element={<ContactTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/contact-type/view"
                  element={<ContactTypeDetails />}
                />

                {/* Invoice Payments */}
                <Route
                  path="/invoice-payments"
                  element={<InvoicePaymentsPage />}
                />
                <Route
                  path="/invoice-payments/:id"
                  element={<InvoicePaymentsDetails />}
                />
                <Route
                  path="/invoice-payments/create"
                  element={<InvoicePaymentsCreatePage />}
                />
                <Route
                  path="/invoice-payments/edit/:id"
                  element={<InvoicePaymentsEditPage isEdit={true} />}
                />
                <Route
                  path="/invoice-payments/:id/edit"
                  element={<InvoicePaymentsEditPage isEdit={true} />}
                />
                <Route
                  path="/invoice-payments/view"
                  element={<InvoicePaymentsDetails />}
                />

                {/* Enquiry */}
                <Route path="/enquiry" element={<EnquiryPage />} />
                <Route path="/enquiry/:id" element={<EnquiryDetails />} />
                <Route path="/enquiry/create" element={<EnquiryCreatePage />} />
                <Route
                  path="/enquiry/edit/:id"
                  element={<EnquiryEditPage isEdit={true} />}
                />
                <Route
                  path="/enquiry/:id/edit"
                  element={<EnquiryEditPage isEdit={true} />}
                />
                <Route path="/enquiry/view" element={<EnquiryDetails />} />

                {/* Weekly Holidays */}
                <Route
                  path="/weekly-holidays"
                  element={<WeeklyHolidaysPage />}
                />
                <Route
                  path="/weekly-holidays/create"
                  element={<WeeklyHolidaysCreatePage />}
                />
                <Route
                  path="/weekly-holidays/:id/edit"
                  element={<WeeklyHolidaysEditPage isEdit={true} />}
                />
                <Route
                  path="/weekly-holidays/edit/:id"
                  element={<WeeklyHolidaysEditPage isEdit={true} />}
                />
                <Route
                  path="/weekly-holidays/:id"
                  element={<WeeklyHolidaysDetails />}
                />
                <Route
                  path="/weekly-holidays/view"
                  element={<WeeklyHolidaysDetails />}
                />

                {/* Depandants */}
                <Route path="/depandants" element={<DepandantsPage />} />
                <Route path="/depandants/:id" element={<DepandantsDetails />} />
                <Route
                  path="/depandants/create"
                  element={<DepandantsCreatePage />}
                />
                <Route
                  path="/depandants/:id/edit"
                  element={<DepandantsEditPage isEdit={true} />}
                />
                <Route
                  path="/depandants/edit/:id"
                  element={<DepandantsEditPage isEdit={true} />}
                />
                <Route
                  path="/depandants/view"
                  element={<DepandantsDetails />}
                />

                {/* Schedule */}
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/schedule/:id" element={<ScheduleDetails />} />
                <Route
                  path="/schedule/create"
                  element={<ScheduleCreatePage />}
                />
                <Route
                  path="/schedule/edit/:id"
                  element={<ScheduleEditPage isEdit={true} />}
                />
                <Route
                  path="/schedule/:id/edit"
                  element={<ScheduleEditPage isEdit={true} />}
                />
                <Route path="/schedule/view" element={<ScheduleDetails />} />

                {/* Booking Type */}
                <Route path="/booking-type" element={<BookingTypePage />} />
                <Route
                  path="/booking-type/:id"
                  element={<BookingTypeDetailsPage />}
                />
                <Route
                  path="/booking-type/create"
                  element={<BookingTypeCreatePage />}
                />
                <Route
                  path="/booking-type/edit/:id"
                  element={<BookingTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/booking-type/view"
                  element={<BookingTypeDetailsPage />}
                />

                {/* Booking list */}
                <Route path="/booking-list" element={<BookingListPage />} />
                <Route
                  path="/booking-list/:id"
                  element={<BookingListDetailsPage />}
                />
                <Route
                  path="/booking-list/create"
                  element={<BookingListCreatePage />}
                />
                <Route
                  path="/booking-list/edit/:id"
                  element={<BookingListEditPage isEdit={true} />}
                />
                <Route
                  path="/booking-list/view"
                  element={<BookingListDetailsPage />}
                />

                {/* booking-sources */}
                <Route path="/booking-source" element={<BookingSourcePage />} />
                <Route
                  path="/booking-source/:id"
                  element={<BookingSourceDetailsPage />}
                />
                <Route
                  path="/booking-source/create"
                  element={<BookingSourceCreatePage />}
                />
                <Route
                  path="/booking-source/edit/:id"
                  element={<BookingSourceEditPage isEdit={true} />}
                />
                <Route
                  path="/booking-source/view"
                  element={<BookingSourceDetailsPage />}
                />

                {/* job-categories */}
                <Route path="/job-categories" element={<JobCategoriesPage />} />
                <Route
                  path="/job-categories/:id"
                  element={<JobCategoriesDetailsPage />}
                />
                <Route
                  path="/job-categories/create"
                  element={<JobCategoriesCreatePage />}
                />
                <Route
                  path="/job-categories/edit/:id"
                  element={<JobCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/job-categories/view"
                  element={<JobCategoriesDetailsPage />}
                />

                {/* Shifts */}
                <Route path="/shifts" element={<ShiftPage />} />
                <Route path="/shifts/:id" element={<ShiftDetailsPage />} />
                <Route path="/shifts/create" element={<ShiftCreatePage />} />
                <Route
                  path="/shifts/edit/:id"
                  element={<ShiftEditPage isEdit={true} />}
                />
                <Route path="/shifts/view" element={<ShiftDetailsPage />} />

                {/* Assets-maintenances */}
                <Route
                  path="/asset-maintenances"
                  element={<AssetMaintenancesPage />}
                />
                <Route
                  path="/asset-maintenances/:id"
                  element={<AssetMaintenancesDetailsPage />}
                />
                <Route
                  path="/asset-maintenances/create"
                  element={<AssetMaintenancesCreatePage />}
                />
                <Route
                  path="/asset-maintenances/edit/:id"
                  element={<AssetMaintenancesEditPage isEdit={true} />}
                />
                <Route
                  path="/asset-maintenances/view"
                  element={<AssetMaintenancesDetailsPage />}
                />

                {/* membership-rules */}
                <Route
                  path="/membership-rules"
                  element={<MembershipRulesPage />}
                />
                <Route
                  path="/membership-rules/:id"
                  element={<MembershipRulesDetailsPage />}
                />
                <Route
                  path="/membership-rules/create"
                  element={<MembershipRulesCreatePage />}
                />
                <Route
                  path="/membership-rules/edit/:id"
                  element={<MembershipRulesEditPage isEdit={true} />}
                />
                <Route
                  path="/membership-rules/view"
                  element={<MembershipRulesDetailsPage />}
                />

                {/* loyalty-users */}
                <Route path="/loyalty-users" element={<LoyaltyUsersPage />} />

                {/* loyalty-programs */}
                <Route
                  path="/loyalty-programs"
                  element={<LoyaltyProgramsPage />}
                />
                <Route
                  path="/loyalty-programs/:id"
                  element={<LoyaltyProgramsDetailsPage />}
                />
                <Route
                  path="/loyalty-programs/create"
                  element={<LoyaltyProgramsCreatePage />}
                />
                <Route
                  path="/loyalty-programs/edit/:id"
                  element={<LoyaltyProgramsEditPage isEdit={true} />}
                />
                <Route
                  path="/loyalty-programs/view"
                  element={<LoyaltyProgramsDetailsPage />}
                />

                {/* Product Unit */}
                <Route path="/product-unit" element={<ProductUnitPage />} />
                <Route
                  path="/product-unit/:id"
                  element={<ProductUnitDetails />}
                />
                <Route
                  path="/product-unit/create"
                  element={<ProductUnitCreatePage />}
                />
                <Route
                  path="/product-unit/edit/:id"
                  element={<ProductUnitEditPage isEdit={true} />}
                />
                <Route
                  path="/product-unit/:id/edit"
                  element={<ProductUnitEditPage isEdit={true} />}
                />
                <Route
                  path="/product-unit/view"
                  element={<ProductUnitDetails />}
                />

                {/* manufacturing-orders */}
                <Route
                  path="/manufacturing-orders"
                  element={<ManufacturingOrdersPage />}
                />
                <Route
                  path="/manufacturing-orders/:id"
                  element={<ManufacturingOrdersDetailsPage />}
                />
                <Route
                  path="/manufacturing-orders/create"
                  element={<ManufacturingOrdersCreatePage />}
                />
                <Route
                  path="/manufacturing-orders/edit/:id"
                  element={<ManufacturingOrdersEditPage isEdit={true} />}
                />
                <Route
                  path="/manufacturing-orders/view"
                  element={<ManufacturingOrdersDetailsPage />}
                />

                {/* Rooms */}
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:id" element={<RoomsDetailsPage />} />
                <Route path="/rooms/create" element={<RoomsCreatePage />} />
                <Route
                  path="/rooms/edit/:id"
                  element={<RoomsEditPage isEdit={true} />}
                />
                <Route path="/rooms/view" element={<RoomsDetailsPage />} />

                {/* Real Estate Agent */}
                <Route
                  path="/realestate-agent"
                  element={<RealEstateAgentPage />}
                />
                <Route
                  path="/realestate-agent/:id"
                  element={<RealEstateAgentDetails />}
                />
                <Route
                  path="/realestate-agent/create"
                  element={<RealEstateAgentCreatePage />}
                />
                <Route
                  path="/realestate-agent/edit/:id"
                  element={<RealEstateAgentEditPage isEdit={true} />}
                />
                <Route
                  path="/realestate-agent/view"
                  element={<RealEstateAgentDetails />}
                />

                {/* VAT Reports */}
                <Route path="/vat-reports" element={<VatReportsPage />} />
                <Route
                  path="/vat-reports/:id"
                  element={<VatReportsDetails />}
                />
                <Route
                  path="/vat-reports/create"
                  element={<VatReportsCreatePage />}
                />
                <Route
                  path="/vat-reports/edit/:id"
                  element={<VatReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/vat-reports/:id/edit"
                  element={<VatReportsEditPage isEdit={true} />}
                />
                <Route
                  path="/vat-reports/view"
                  element={<VatReportsDetails />}
                />

                {/* Logistic Warehouse */}
                <Route
                  path="/logistic-warehouse"
                  element={<LogisticWarehousePage />}
                />
                <Route
                  path="/logistic-warehouse/:id"
                  element={<LogisticWarehouseDetailsPage />}
                />
                <Route
                  path="/logistic-warehouse/create"
                  element={<LogisticWarehouseCreatePage />}
                />
                <Route
                  path="/logistic-warehouse/edit/:id"
                  element={<LogisticWarehouseEditPage isEdit={true} />}
                />
                <Route
                  path="/logistic-warehouse/view"
                  element={<LogisticWarehouseDetailsPage />}
                />

                {/* Business Broker */}
                <Route
                  path="/business-broker"
                  element={<BusinessBrokerPage />}
                />
                <Route
                  path="/business-broker/:id"
                  element={<BusinessBrokerDetails />}
                />
                <Route
                  path="/business-broker/create"
                  element={<BusinessBrokerCreatePage />}
                />
                <Route
                  path="/business-broker/edit/:id"
                  element={<BusinessBrokerEditPage isEdit={true} />}
                />
                <Route
                  path="/business-broker/view"
                  element={<BusinessBrokerDetails />}
                />

                {/* Payslips */}
                <Route path="/payslips" element={<PayslipsPage />} />
                <Route path="/payslips/:id" element={<PayslipsDetails />} />
                <Route
                  path="/payslips/create"
                  element={<PayslipsCreatePage />}
                />
                <Route
                  path="/payslips/edit/:id"
                  element={<PayslipsEditPage isEdit={true} />}
                />
                <Route
                  path="/payslips/:id/edit"
                  element={<PayslipsEditPage isEdit={true} />}
                />
                <Route path="/payslips/view" element={<PayslipsDetails />} />

                {/* Payment Modes */}
                <Route path="/payment-modes" element={<PaymentModesPage />} />
                <Route
                  path="/payment-modes/:id"
                  element={<PaymentModesDetails />}
                />
                <Route
                  path="/payment-modes/create"
                  element={<PaymentModesCreatePage />}
                />
                <Route
                  path="/payment-modes/edit/:id"
                  element={<PaymentModesEditPage isEdit={true} />}
                />
                <Route
                  path="/payment-modes/:id/edit"
                  element={<PaymentModesEditPage isEdit={true} />}
                />
                <Route
                  path="/payment-modes/view"
                  element={<PaymentModesDetails />}
                />

                {/* Team Members */}
                <Route path="/team-members" element={<TeamMembersPage />} />
                <Route
                  path="/team-members/:id"
                  element={<TeamMembersDetails />}
                />
                <Route
                  path="/team-members/create"
                  element={<TeamMembersCreatePage />}
                />
                <Route
                  path="/team-members/edit/:id"
                  element={<TeamMembersEditPage isEdit={true} />}
                />
                <Route
                  path="/team-members/:id/edit"
                  element={<TeamMembersEditPage isEdit={true} />}
                />
                <Route
                  path="/team-members/view"
                  element={<TeamMembersDetails />}
                />

                {/* Assign By Doctor */}
                <Route
                  path="/assignByDoctor"
                  element={<AssignByDoctorPage />}
                />
                <Route
                  path="/assignByDoctor/:id"
                  element={<AssignByDoctorDetails />}
                />
                <Route
                  path="/assignByDoctor/create"
                  element={<AssignByDoctorCreatePage />}
                />
                <Route
                  path="/assignByDoctor/edit/:id"
                  element={<AssignByDoctorEditPage isEdit={true} />}
                />
                <Route
                  path="/assignByDoctor/:id/edit"
                  element={<AssignByDoctorEditPage isEdit={true} />}
                />
                <Route
                  path="/assignByDoctor/view"
                  element={<AssignByDoctorDetails />}
                />

                {/* Project Status */}
                <Route path="/project-status" element={<ProjectStatusPage />} />
                <Route
                  path="/project-status/:id"
                  element={<ProjectStatusDetails />}
                />
                <Route
                  path="/project-status/create"
                  element={<ProjectStatusCreatePage />}
                />
                <Route
                  path="/project-status/edit/:id"
                  element={<ProjectStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/project-status/:id/edit"
                  element={<ProjectStatusEditPage isEdit={true} />}
                />
                <Route
                  path="/project-status/view"
                  element={<ProjectStatusDetails />}
                />

                {/* Contract */}
                <Route path="/contract" element={<ContractPage />} />
                <Route path="/contract/:id" element={<ContractDetails />} />
                <Route
                  path="/contract/create"
                  element={<ContractCreatePage />}
                />
                <Route
                  path="/contract/edit/:id"
                  element={<ContractEditPage isEdit={true} />}
                />
                <Route
                  path="/contract/:id/edit"
                  element={<ContractEditPage isEdit={true} />}
                />
                <Route path="/contract/view" element={<ContractDetails />} />

                {/* Loan Type */}
                <Route path="/loan-type" element={<LoanTypePage />} />
                <Route path="/loan-type/:id" element={<LoanTypeDetails />} />
                <Route
                  path="/loan-type/create"
                  element={<LoanTypeCreatePage />}
                />
                <Route
                  path="/loan-type/edit/:id"
                  element={<LoanTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/loan-type/:id/edit"
                  element={<LoanTypeEditPage isEdit={true} />}
                />

                <Route path="/loan-type/view" element={<LoanTypeDetails />} />

                {/* Contact Form */}
                <Route path="/contact-form" element={<ContactFormPage />} />
                <Route
                  path="/contact-form/:id"
                  element={<ContactFormDetails />}
                />
                <Route
                  path="/contact-form/create"
                  element={<ContactFormCreatePage />}
                />
                <Route
                  path="/contact-form/edit/:id"
                  element={<ContactFormEditPage isEdit={true} />}
                />
                <Route
                  path="/contact-form/:id/edit"
                  element={<ContactFormEditPage isEdit={true} />}
                />
                <Route
                  path="/contact-form/view"
                  element={<ContactFormDetails />}
                />

                {/* Patient Appoinment */}
                <Route
                  path="/patient-appoinment"
                  element={<PatientAppoinmentPage />}
                />
                <Route
                  path="/patient-appoinment/:id"
                  element={<PatientAppoinmentDetails />}
                />
                <Route
                  path="/patient-appoinment/create"
                  element={<PatientAppoinmentCreatePage />}
                />
                <Route
                  path="/patient-appoinment/edit/:id"
                  element={<PatientAppoinmentEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-appoinment/:id/edit"
                  element={<PatientAppoinmentEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-appoinment/view"
                  element={<PatientAppoinmentDetails />}
                />

                {/* Patient */}
                <Route path="/patient" element={<PatientPage />} />
                <Route path="/patient/:id" element={<PatientDetails />} />
                <Route path="/patient/create" element={<PatientCreatePage />} />
                <Route
                  path="/patient/edit/:id"
                  element={<PatientEditPage isEdit={true} />}
                />
                <Route
                  path="/patient/:id/edit"
                  element={<PatientEditPage isEdit={true} />}
                />
                <Route path="/patient/view" element={<PatientDetails />} />

                {/* Allowance Type */}
                <Route path="/allowance-type" element={<AllowanceTypePage />} />
                <Route
                  path="/allowance-type/:id"
                  element={<AllowanceTypeDetails />}
                />
                <Route
                  path="/allowance-type/create"
                  element={<AllowanceTypeCreatePage />}
                />
                <Route
                  path="/allowance-type/edit/:id"
                  element={<AllowanceTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/allowance-type/:id/edit"
                  element={<AllowanceTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/allowance-type/view"
                  element={<AllowanceTypeDetails />}
                />

                {/* Patient Medication */}
                <Route
                  path="/patient-medication"
                  element={<PatientMedicationPage />}
                />
                <Route
                  path="/patient-medication/:id"
                  element={<PatientMedicationDetails />}
                />
                <Route
                  path="/patient-medication/create"
                  element={<PatientMedicationCreatePage />}
                />
                <Route
                  path="/patient-medication/edit/:id"
                  element={<PatientMedicationEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-medication/:id/edit"
                  element={<PatientMedicationEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-medication/view"
                  element={<PatientMedicationDetails />}
                />

                {/* Package */}
                <Route path="/package" element={<PackagePage />} />
                <Route path="/package/:id" element={<PackageDetails />} />
                <Route path="/package/create" element={<PackageCreatePage />} />
                <Route
                  path="/package/edit/:id"
                  element={<PackageEditPage isEdit={true} />}
                />
                <Route
                  path="/package/:id/edit"
                  element={<PackageEditPage isEdit={true} />}
                />
                <Route path="/package/view" element={<PackageDetails />} />

                {/* Production */}
                <Route path="/production" element={<ProductionPage />} />
                <Route path="/production/:id" element={<ProductionDetails />} />
                <Route
                  path="/production/create"
                  element={<ProductionCreatePage />}
                />
                <Route
                  path="/production/edit/:id"
                  element={<ProductionEditPage isEdit={true} />}
                />
                <Route
                  path="/production/:id/edit"
                  element={<ProductionEditPage isEdit={true} />}
                />
                <Route
                  path="/production/view"
                  element={<ProductionDetails />}
                />

                {/* Doctor */}
                <Route path="/doctor" element={<DoctorPage />} />
                <Route path="/doctor/:id" element={<DoctorDetails />} />
                <Route path="/doctor/create" element={<DoctorCreatePage />} />
                <Route
                  path="/doctor/edit/:id"
                  element={<DoctorEditPage isEdit={true} />}
                />
                <Route
                  path="/doctor/:id/edit"
                  element={<DoctorEditPage isEdit={true} />}
                />

                <Route path="/doctor/view" element={<DoctorDetails />} />

                {/* Client */}
                <Route path="/client" element={<ClientPage />} />
                <Route path="/client/:id" element={<ClientDetails />} />
                <Route path="/client/create" element={<ClientCreatePage />} />
                <Route
                  path="/client/edit/:id"
                  element={<ClientEditPage isEdit={true} />}
                />
                <Route
                  path="/client/:id/edit"
                  element={<ClientEditPage isEdit={true} />}
                />
                <Route path="/client/view" element={<ClientDetails />} />

                {/* Time Slot */}
                <Route path="/time-slot" element={<TimeSlotPage />} />
                <Route path="/time-slot/:id" element={<TimeSlotDetails />} />
                <Route
                  path="/time-slot/create"
                  element={<TimeSlotCreatePage />}
                />
                <Route
                  path="/time-slot/edit/:id"
                  element={<TimeSlotEditPage isEdit={true} />}
                />
                <Route
                  path="/time-slot/:id/edit"
                  element={<TimeSlotEditPage isEdit={true} />}
                />
                <Route path="/time-slot/view" element={<TimeSlotDetails />} />

                {/* shipment */}
                <Route path="/shipment" element={<ShipmentPage />} />
                <Route path="/shipment/:id" element={<ShipmentDetails />} />
                <Route
                  path="/shipment/create"
                  element={<ShipmentCreatePage />}
                />
                <Route
                  path="/shipment/edit/:id"
                  element={<ShipmentEditPage isEdit={true} />}
                />
                <Route path="/shipment/view" element={<ShipmentDetails />} />

                {/* Facility Details */}
                <Route
                  path="/facilitydetails"
                  element={<FacilityDetailsPage />}
                />
                <Route
                  path="/facilitydetails/:id"
                  element={<FacilityDetailsDetails />}
                />
                <Route
                  path="/facilitydetails/create"
                  element={<FacilityDetailsCreatePage />}
                />
                <Route
                  path="/facilitydetails/edit/:id"
                  element={<FacilityDetailsEditPage isEdit={true} />}
                />
                <Route
                  path="/facilitydetails/:id/edit"
                  element={<FacilityDetailsEditPage isEdit={true} />}
                />
                <Route
                  path="/facilitydetails/view"
                  element={<FacilityDetailsDetails />}
                />

                {/* Pickup */}
                <Route path="/pickup" element={<PickupPage />} />
                <Route path="/pickup/:id" element={<PickupDetails />} />
                <Route path="/pickup/create" element={<PickupCreatePage />} />
                <Route
                  path="/pickup/edit/:id"
                  element={<PickupEditPage isEdit={true} />}
                />
                <Route path="/pickup/view" element={<PickupDetails />} />

                {/* User Log */}
                <Route path="/user-log" element={<UserLogPage />} />

                {/* Pending Order */}
                <Route path="/pending-order" element={<PendingOrderPage />} />

                {/* Transport Master */}
                <Route
                  path="/transport-master"
                  element={<TransportMasterPage />}
                />
                <Route
                  path="/transport-master/:id"
                  element={<TransportMasterDetailsPage />}
                />
                <Route
                  path="/transport-master/create"
                  element={<TransportMasterFormPage />}
                />
                <Route
                  path="/transport-master/edit/:id"
                  element={<TransportMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/transport-master/view"
                  element={<TransportMasterDetailsPage />}
                />

                {/* Promocodes */}
                <Route path="/promocodes" element={<PromocodesPage />} />
                <Route path="/promocodes/:id" element={<PromocodesDetails />} />
                <Route
                  path="/promocodes/create"
                  element={<PromocodesCreatePage />}
                />
                <Route
                  path="/promocodes/edit/:id"
                  element={<PromocodesEditPage isEdit={true} />}
                />
                <Route
                  path="/promocodes/:id/edit"
                  element={<PromocodesEditPage isEdit={true} />}
                />
                <Route
                  path="/promocodes/view"
                  element={<PromocodesDetails />}
                />

                {/* supplier Master */}
                <Route
                  path="/supplier-master"
                  element={<SupplierMasterPage />}
                />
                <Route
                  path="/supplier-master/:id"
                  element={<SupplierMasterDetailsPage />}
                />
                <Route
                  path="/supplier-master/create"
                  element={<SupplierMasterFormPage />}
                />
                <Route
                  path="/supplier-master/edit/:id"
                  element={<SupplierMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/supplier-master/view"
                  element={<SupplierMasterDetailsPage />}
                />

                {/* journal-entry */}
                <Route path="/journal-entry" element={<JournalEntryPage />} />
                <Route
                  path="/journal-entry/:id"
                  element={<JournalEntryDetails />}
                />
                <Route
                  path="/journal-entry/create"
                  element={<JournalEntryCreatePage />}
                />
                <Route
                  path="/journal-entry/edit/:id"
                  element={<JournalEntryEditPage isEdit={true} />}
                />
                <Route
                  path="/journal-entry/view"
                  element={<JournalEntryDetails />}
                />

                {/* Maintenaces */}
                <Route path="/maintenances" element={<MaintenacesPage />} />
                <Route
                  path="/maintenances/:id"
                  element={<MaintenacesDetails />}
                />
                <Route
                  path="/maintenances/create"
                  element={<MaintenacesCreatePage />}
                />
                <Route
                  path="/maintenances/edit/:id"
                  element={<MaintenacesEditPage isEdit={true} />}
                />
                <Route
                  path="/maintenances/:id/edit"
                  element={<MaintenacesEditPage isEdit={true} />}
                />
                <Route
                  path="/maintenances/view"
                  element={<MaintenacesDetails />}
                />

                {/* Inspections */}
                <Route path="/inspections" element={<InspectionsPage />} />
                <Route
                  path="/inspections/:id"
                  element={<InspectionsDetails />}
                />
                <Route
                  path="/inspections/create"
                  element={<InspectionsCreatePage />}
                />
                <Route
                  path="/inspections/:id/edit"
                  element={<InspectionsEditPage isEdit={true} />}
                />
                <Route
                  path="/inspections/edit/:id"
                  element={<InspectionsEditPage isEdit={true} />}
                />
                <Route
                  path="/inspections/view"
                  element={<InspectionsDetails />}
                />

                {/* Checkin */}
                <Route path="/checkin" element={<CheckinPage />} />
                <Route path="/checkin/:id" element={<CheckinDetails />} />
                <Route path="/checkin/create" element={<CheckinCreatePage />} />
                <Route
                  path="/checkin/:id/edit"
                  element={<CheckinEditPage isEdit={true} />}
                />
                <Route
                  path="/checkin/edit/:id"
                  element={<CheckinEditPage isEdit={true} />}
                />
                <Route path="/checkin/view" element={<CheckinDetails />} />

                {/* Port Master */}
                <Route path="/port-master" element={<PortMasterPage />} />
                <Route
                  path="/port-master/:id"
                  element={<PortMasterDetails />}
                />
                <Route
                  path="/port-master/create"
                  element={<PortMasterCreatePage />}
                />
                <Route
                  path="/port-master/:id/edit"
                  element={<PortMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/port-master/edit/:id"
                  element={<PortMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/port-master/view"
                  element={<PortMasterDetails />}
                />

                {/* Shift Type */}
                <Route path="/shift-type" element={<ShiftTypePage />} />
                <Route path="/shift-type/:id" element={<ShiftTypeDetails />} />
                <Route
                  path="/shift-type/create"
                  element={<ShiftTypeCreatePage />}
                />
                <Route
                  path="/shift-type/edit/:id"
                  element={<ShiftTypeEditPage isEdit={true} />}
                />
                <Route
                  path="/shift-type/edit/:id"
                  element={<ShiftTypeEditPage isEdit={true} />}
                />
                <Route path="/shift-type/view" element={<ShiftTypeDetails />} />

                {/* Project Group */}
                <Route path="/project-group" element={<ProjectGroupPage />} />
                <Route
                  path="/project-group/:id"
                  element={<ProjectGroupDetails />}
                />
                <Route
                  path="/project-group/create"
                  element={<ProjectGroupCreatePage />}
                />
                <Route
                  path="/project-group/edit/:id"
                  element={<ProjectGroupEditPage isEdit={true} />}
                />
                <Route
                  path="/project-group/:id/edit"
                  element={<ProjectGroupEditPage isEdit={true} />}
                />
                <Route
                  path="/project-group/view"
                  element={<ProjectGroupDetails />}
                />

                {/* Patient Visit */}
                <Route path="/patient-visit" element={<PatientVisitPage />} />
                <Route
                  path="/patient-visit/:id"
                  element={<PatientVisitDetails />}
                />
                <Route
                  path="/patient-visit/create"
                  element={<PatientVisitCreatePage />}
                />
                <Route
                  path="/patient-visit/edit/:id"
                  element={<PatientVisitEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-visit/:id/edit"
                  element={<PatientVisitEditPage isEdit={true} />}
                />
                <Route
                  path="/patient-visit/view"
                  element={<PatientVisitDetails />}
                />

                {/* Facility */}
                <Route path="/facility" element={<FacilityPage />} />
                <Route path="/facility/:id" element={<FacilityDetails />} />
                <Route
                  path="/facility/create"
                  element={<FacilityCreatePage />}
                />
                <Route
                  path="/facility/edit/:id"
                  element={<FacilityEditPage isEdit={true} />}
                />
                <Route
                  path="/facility/:id/edit"
                  element={<FacilityEditPage isEdit={true} />}
                />
                <Route path="/facility/view" element={<FacilityDetails />} />

                {/* Onboarding */}
                <Route path="/onboarding" element={<OnboardingPage />} />
                <Route path="/onboarding/:id" element={<OnboardingDetails />} />
                <Route
                  path="/onboarding/create"
                  element={<OnboardingCreatePage />}
                />
                <Route
                  path="/onboarding/:id/edit"
                  element={<OnboardingEditPage isEdit={true} />}
                />
                <Route
                  path="/onboarding/edit/:id"
                  element={<OnboardingEditPage isEdit={true} />}
                />
                <Route
                  path="/onboarding/view"
                  element={<OnboardingDetails />}
                />

                {/* Agent Master */}
                <Route path="/agent-master" element={<AgentMasterPage />} />
                <Route
                  path="/agent-master/:id"
                  element={<AgentMasterDetails />}
                />
                <Route
                  path="/agent-master/create"
                  element={<AgentMasterCreatePage />}
                />
                <Route
                  path="/agent-master/edit/:id"
                  element={<AgentMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/agent-master/edit/:id"
                  element={<AgentMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/agent-master/view"
                  element={<AgentMasterDetails />}
                />

                {/* Consignee Master */}
                <Route
                  path="/consignee-master"
                  element={<ConsigneeMasterPage />}
                />
                <Route
                  path="/consignee-master/:id"
                  element={<ConsigneeMasterDetails />}
                />
                <Route
                  path="/consignee-master/create"
                  element={<ConsigneeMasterCreatePage />}
                />
                <Route
                  path="/consignee-master/edit/:id"
                  element={<ConsigneeMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/consignee-master/edit/:id"
                  element={<ConsigneeMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/consignee-master/view"
                  element={<ConsigneeMasterDetails />}
                />

                {/* Assign By All */}
                <Route path="/assignByAll" element={<AssignByAllPage />} />
                <Route
                  path="/assignByAll/:id"
                  element={<AssignByAllDetails />}
                />
                <Route
                  path="/assignByAll/create"
                  element={<AssignByAllCreatePage />}
                />
                <Route
                  path="/assignByAll/edit/:id"
                  element={<AssignByAllEditPage isEdit={true} />}
                />
                <Route
                  path="/assignByAll/:id/edit"
                  element={<AssignByAllEditPage isEdit={true} />}
                />
                <Route
                  path="/assignByAll/view"
                  element={<AssignByAllDetails />}
                />

                {/* Transit Order */}
                <Route path="/transit-order" element={<TransitOrderPage />} />
                <Route
                  path="/transit-order/:id"
                  element={<TransitOrderDetails />}
                />
                <Route
                  path="/transit-order/create"
                  element={<TransitOrderCreatePage />}
                />
                <Route
                  path="/transit-order/edit/:id"
                  element={<TransitOrderEditPage isEdit={true} />}
                />
                <Route
                  path="/consignee-master/:id/edit"
                  element={<ConsigneeMasterEditPage isEdit={true} />}
                />
                <Route
                  path="/transit-order/view"
                  element={<TransitOrderDetails />}
                />

                {/* Positions */}
                <Route path="/positions" element={<PositionsPage />} />
                <Route path="/positions/:id" element={<PositionsDetails />} />
                <Route
                  path="/positions/create"
                  element={<PositionsCreatePage />}
                />
                <Route
                  path="/positions/edit/:id"
                  element={<PositionsEditPage isEdit={true} />}
                />
                <Route
                  path="/positions/:id/edit"
                  element={<PositionsEditPage isEdit={true} />}
                />
                <Route path="/positions/view" element={<PositionsDetails />} />

                {/* Complementaries */}
                <Route
                  path="/complementaries"
                  element={<ComplementariesPage />}
                />
                <Route
                  path="/complementaries/:id"
                  element={<ComplementariesDetails />}
                />
                <Route
                  path="/complementaries/create"
                  element={<ComplementariesCreatePage />}
                />
                <Route
                  path="/complementaries/edit/:id"
                  element={<ComplementariesEditPage isEdit={true} />}
                />
                <Route
                  path="/complementaries/:id/edit"
                  element={<ComplementariesEditPage isEdit={true} />}
                />
                <Route
                  path="/complementaries/view"
                  element={<ComplementariesDetails />}
                />

                {/* Bill */}
                <Route path="/bill" element={<BillPage />} />
                <Route path="/bill/:id" element={<BillDetails />} />
                <Route path="/bill/create" element={<BillCreatePage />} />
                <Route
                  path="/bill/edit/:id"
                  element={<BillEditPage isEdit={true} />}
                />
                <Route
                  path="/bill/:id/edit"
                  element={<BillEditPage isEdit={true} />}
                />
                <Route
                  path="/bill/edit/:id"
                  element={<BillEditPage isEdit={true} />}
                />
                <Route path="/bill/view" element={<BillDetails />} />

                {/* Transporter */}
                <Route path="/transporter" element={<TransporterPage />} />
                <Route
                  path="/transporter/:id"
                  element={<TransporterDetails />}
                />
                <Route
                  path="/transporter/create"
                  element={<TransporterCreatePage />}
                />
                <Route
                  path="/transporter/edit/:id"
                  element={<TransporterEditPage isEdit={true} />}
                />
                <Route
                  path="/transporter/:id/edit"
                  element={<TransporterEditPage isEdit={true} />}
                />
                <Route
                  path="/transporter/view"
                  element={<TransporterDetails />}
                />

                {/* Pre-Alerts */}
                <Route path="/pre-alerts" element={<PreAlertsPage />} />
                <Route path="/pre-alerts/:id" element={<PreAlertsDetails />} />
                <Route
                  path="/pre-alerts/create"
                  element={<PreAlertsCreatePage />}
                />
                <Route
                  path="/pre-alerts/edit/:id"
                  element={<PreAlertsEditPage isEdit={true} />}
                />
                <Route
                  path="/pre-alerts/:id/edit"
                  element={<PreAlertsEditPage isEdit={true} />}
                />
                <Route path="/pre-alerts/view" element={<PreAlertsDetails />} />

                {/* Arrival Port */}
                <Route path="/arrival-port" element={<ArrivalPortPage />} />
                <Route
                  path="/arrival-port/:id"
                  element={<ArrivalPortDetails />}
                />
                <Route
                  path="/arrival-port/create"
                  element={<ArrivalPortCreatePage />}
                />
                <Route
                  path="/arrival-port/edit/:id"
                  element={<ArrivalPortEditPage isEdit={true} />}
                />
                <Route
                  path="/arrival-port/:id/edit"
                  element={<ArrivalPortEditPage isEdit={true} />}
                />
                <Route
                  path="/arrival-port/view"
                  element={<ArrivalPortDetails />}
                />

                {/* Checks */}
                <Route path="/checks" element={<ChecksPage />} />
                <Route path="/checks/:id" element={<ChecksDetails />} />
                <Route path="/checks/create" element={<ChecksCreatePage />} />
                <Route
                  path="/checks/edit/:id"
                  element={<ChecksEditPage isEdit={true} />}
                />
                <Route
                  path="/checks/edit/:id"
                  element={<ChecksEditPage isEdit={true} />}
                />
                <Route path="/checks/view" element={<ChecksDetails />} />

                {/* Service Categories */}
                <Route
                  path="/service-categories"
                  element={<ServiceCategoriesPage />}
                />
                <Route
                  path="/service-categories/:id"
                  element={<ServiceCategoriesDetails />}
                />
                <Route
                  path="/service-categories/create"
                  element={<ServiceCategoriesCreatePage />}
                />
                <Route
                  path="/service-categories/edit/:id"
                  element={<ServiceCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/service-categories/:id/edit"
                  element={<ServiceCategoriesEditPage isEdit={true} />}
                />
                <Route
                  path="/service-categories/view"
                  element={<ServiceCategoriesDetails />}
                />

                {/* Service */}
                <Route path="/service" element={<ServicePage />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/service/create" element={<ServiceCreatePage />} />
                <Route
                  path="/service/edit/:id"
                  element={<ServiceEditPage isEdit={true} />}
                />
                <Route
                  path="/service/:id/edit"
                  element={<ServiceEditPage isEdit={true} />}
                />
                <Route path="/service/view" element={<ServiceDetails />} />

                {/* Print Label */}
                <Route path="/print-label" element={<PrintLabelPage />} />

                {/* Devices */}
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="/devices/:id" element={<DevicesDetails />} />
                <Route path="/devices/create" element={<DevicesCreatePage />} />
                <Route
                  path="/devices/edit/:id"
                  element={<DevicesEditPage isEdit={true} />}
                />
                <Route
                  path="/devices/:id/edit"
                  element={<DevicesEditPage isEdit={true} />}
                />
                <Route path="/devices/view" element={<DevicesDetails />} />

                {/* Picking */}
                <Route path="/packing" element={<PackingPage />} />
                <Route path="/packing/:id" element={<PackingDetails />} />
                <Route path="/packing/create" element={<PackingCreatePage />} />
                <Route
                  path="/packing/edit/:id"
                  element={<PackingEditPage isEdit={true} />}
                />
                <Route
                  path="/packing/:id/edit"
                  element={<PackingEditPage isEdit={true} />}
                />
                <Route path="/packing/view" element={<PackingDetails />} />

                {/* RoomSize */}
                <Route path="/room-size" element={<RoomSizePage />} />
                <Route
                  path="/room-size/:id"
                  element={<RoomSizeDetailsPage />}
                />
                <Route
                  path="/room-size/create"
                  element={<RoomSizeCreatePage />}
                />
                <Route
                  path="/room-size/edit/:id"
                  element={<RoomSizeEditPage isEdit={true} />}
                />
                <Route
                  path="/room-size/view"
                  element={<RoomSizeDetailsPage />}
                />

                {/* Work Orders */}
                <Route path="/work-orders" element={<WorkOrdersPage />} />
                <Route
                  path="/work-orders/:id"
                  element={<WorkOrdersDetails />}
                />
                <Route
                  path="/work-orders/create"
                  element={<WorkOrdersCreatePage />}
                />
                <Route
                  path="/work-orders/edit/:id"
                  element={<WorkOrdersEditPage isEdit={true} />}
                />
                <Route
                  path="/work-orders/:id/edit"
                  element={<WorkOrdersEditPage isEdit={true} />}
                />
                <Route
                  path="/work-orders/view"
                  element={<WorkOrdersDetails />}
                />

                {/* Checkout */}
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/:id" element={<CheckoutDetails />} />
                <Route
                  path="/checkout/create"
                  element={<CheckoutCreatePage />}
                />
                <Route
                  path="/checkout/edit/:id"
                  element={<CheckoutEditPage isEdit={true} />}
                />
                <Route
                  path="/checkout/:id/edit"
                  element={<CheckoutEditPage isEdit={true} />}
                />
                <Route path="/checkout/view" element={<CheckoutDetails />} />

                {/* Leads */}
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/leads/:id" element={<LeadsDetailsPage />} />
                <Route path="/leads/create" element={<LeadsCreatePage />} />
                <Route
                  path="/leads/edit/:id"
                  element={<LeadsEditPage isEdit={true} />}
                />
                <Route path="/leads/view" element={<LeadsDetailsPage />} />

                {/* House Keepers */}
                <Route path="/house-keepers" element={<HouseKeepersPage />} />
                <Route
                  path="/house-keepers/:id"
                  element={<HouseKeepersDetails />}
                />
                <Route
                  path="/house-keepers/create"
                  element={<HouseKeepersCreatePage />}
                />
                <Route
                  path="/house-keepers/:id/edit"
                  element={<HouseKeepersEditPage isEdit={true} />}
                />
                <Route
                  path="/house-keepers/edit/:id"
                  element={<HouseKeepersEditPage isEdit={true} />}
                />
                <Route
                  path="/house-keepers/view"
                  element={<HouseKeepersDetails />}
                />

                {/* Licenses */}
                <Route path="/licenses" element={<LicensesPage />} />
                <Route path="/licenses/:id" element={<LicensesDetails />} />
                <Route
                  path="/licenses/create"
                  element={<LicensesCreatePage />}
                />
                <Route
                  path="/licenses/edit/:id"
                  element={<LicensesEditPage isEdit={true} />}
                />
                <Route
                  path="/licenses/:id/edit"
                  element={<LicensesEditPage isEdit={true} />}
                />
                <Route path="/licenses/view" element={<LicensesDetails />} />

                {/* Assign House Keepers */}
                <Route
                  path="/assign-house-keepers"
                  element={<AssignHouseKeepersPage />}
                />
                <Route
                  path="/assign-house-keepers/:id"
                  element={<AssignHouseKeepersDetails />}
                />
                <Route
                  path="/assign-house-keepers/create"
                  element={<AssignHouseKeepersCreatePage />}
                />
                <Route
                  path="/assign-house-keepers/:id/edit"
                  element={<AssignHouseKeepersEditPage isEdit={true} />}
                />
                <Route
                  path="/assign-house-keepers/edit/:id"
                  element={<AssignHouseKeepersEditPage isEdit={true} />}
                />
                <Route
                  path="/assign-house-keepers/view"
                  element={<AssignHouseKeepersDetails />}
                />

                {/* Receive Port Logistic */}
                <Route
                  path="/receive-port-logistic"
                  element={<ReceivePortLogisticPage />}
                />
                <Route
                  path="/receive-port-logistic/:id"
                  element={<ReceivePortLogisticDetails />}
                />
                <Route
                  path="/receive-port-logistic/create"
                  element={<ReceivePortLogisticCreatePage />}
                />
                <Route
                  path="/receive-port-logistic/edit/:id"
                  element={<ReceivePortLogisticEditPage isEdit={true} />}
                />
                <Route
                  path="/receive-port-logistic/:id/edit"
                  element={<ReceivePortLogisticEditPage isEdit={true} />}
                />
                <Route
                  path="/receive-port-logistic/view"
                  element={<ReceivePortLogisticDetails />}
                />

                {/* shipping */}
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/shipping/:id" element={<ShippingDetails />} />
                <Route
                  path="/shipping/create"
                  element={<ShippingCreatePage />}
                />
                <Route
                  path="/shipping/:id/edit"
                  element={<ShippingEditPage isEdit={true} />}
                />
                <Route
                  path="/shipping/edit/:id"
                  element={<ShippingEditPage isEdit={true} />}
                />
                <Route path="/shipping/view" element={<ShippingDetails />} />

                {/* Tasks */}
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/:id" element={<TasksDetails />} />
                <Route path="/tasks/create" element={<TasksCreatePage />} />
                <Route
                  path="/tasks/:id/edit"
                  element={<TasksEditPage isEdit={true} />}
                />
                <Route
                  path="/tasks/edit/:id"
                  element={<TasksEditPage isEdit={true} />}
                />
                <Route path="/tasks/view" element={<TasksDetails />} />

                {/* Benefit Penalty */}
                <Route
                  path="/benefit-penalty"
                  element={<BenefitPenaltyPage />}
                />
                <Route
                  path="/benefit-penalty/:id"
                  element={<BenefitPenaltyDetails />}
                />
                <Route
                  path="/benefit-penalty/create"
                  element={<BenefitPenaltyCreatePage />}
                />
                <Route
                  path="/benefit-penalty/:id/edit"
                  element={<BenefitPenaltyEditPage isEdit={true} />}
                />
                <Route
                  path="/benefit-penalty/edit/:id"
                  element={<BenefitPenaltyEditPage isEdit={true} />}
                />
                <Route
                  path="/benefit-penalty/view"
                  element={<BenefitPenaltyDetails />}
                />

                {/* Skills */}
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/skills/:id" element={<SkillsDetails />} />
                <Route path="/skills/create" element={<SkillsCreatePage />} />
                <Route
                  path="/skills/:id/edit"
                  element={<SkillsEditPage isEdit={true} />}
                />
                <Route
                  path="/skills/edit/:id"
                  element={<SkillsEditPage isEdit={true} />}
                />
                <Route path="/skills/view" element={<SkillsDetails />} />

                {/* Leaves Approval */}
                <Route
                  path="/leaves-approval"
                  element={<LeavesApprovalPage />}
                />
                <Route
                  path="/leaves-approval/view"
                  element={<LeavesApprovalDetails />}
                />
                <Route
                  path="/leaves-approval/view/:id"
                  element={<LeavesApprovalDetails />}
                />

                {/* tex rates => tax-rates` */}
                <Route path="/tax-rates" element={<TaxRatesPage />} />
                <Route
                  path="/tax-rates/:id"
                  element={<TaxRatesDetailsPage />}
                />
                <Route
                  path="/tax-rates/create"
                  element={<TaxRatesCreatePage />}
                />
                <Route
                  path="/tax-rates/edit/:id"
                  element={<TaxRatesEditPage isEdit={true} />}
                />
                <Route
                  path="/tax-rates/view"
                  element={<TaxRatesDetailsPage />}
                />

                {/* Job Post */}
                <Route path="/job-post" element={<JobPostPage />} />
                <Route path="/job-post/:id" element={<JobPostDetails />} />
                <Route
                  path="/job-post/create"
                  element={<JobPostCreatePage />}
                />
                <Route
                  path="/job-post/edit/:id"
                  element={<JobPostEditPage isEdit={true} />}
                />
                <Route
                  path="/job-post/:id/edit"
                  element={<JobPostEditPage isEdit={true} />}
                />
                <Route path="/job-post/view" element={<JobPostDetails />} />

                {/* candidateList => candidate-list` */}
                <Route path="/candidate-list" element={<CandidateListPage />} />
                <Route
                  path="/candidate-list/:id"
                  element={<CandidateListDetailsPage />}
                />
                <Route
                  path="/candidate-list/create"
                  element={<CandidateListCreatePage />}
                />
                <Route
                  path="/candidate-list/edit/:id"
                  element={<CandidateListEditPage isEdit={true} />}
                />
                <Route
                  path="/candidate-list/view"
                  element={<CandidateListDetailsPage />}
                />

                {/* Commission */}
                <Route path="/commission" element={<CommissionPage />} />
                <Route
                  path="/commission/:id"
                  element={<CommissionDetailsPage />}
                />
                <Route
                  path="/commission/create"
                  element={<CommissionCreatePage />}
                />
                <Route
                  path="/commission/edit/:id"
                  element={<CommissionEditPage isEdit={true} />}
                />
                <Route
                  path="/commission/view"
                  element={<CommissionDetailsPage />}
                />

                {/* insurances */}
                <Route path="/insurances" element={<InsurancesPage />} />
                <Route
                  path="/insurances/:id"
                  element={<InsurancesDetailsPage />}
                />
                <Route
                  path="/insurances/create"
                  element={<InsurancesCreatePage />}
                />
                <Route
                  path="/insurances/edit/:id"
                  element={<InsurancesEditPage isEdit={true} />}
                />
                <Route
                  path="/insurances/view"
                  element={<InsurancesDetailsPage />}
                />

                {/* certificates */}
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route
                  path="/certificates/:id"
                  element={<CertificatesDetailsPage />}
                />
                <Route
                  path="/certificates/create"
                  element={<CertificatesCreatePage />}
                />
                <Route
                  path="/certificates/edit/:id"
                  element={<CertificatesEditPage isEdit={true} />}
                />
                <Route
                  path="/certificates/view"
                  element={<CertificatesDetailsPage />}
                />

                {/* financial-year => financialYear */}
                <Route path="/financial-year" element={<FinancialYearPage />} />
                <Route
                  path="/financial-year/:id"
                  element={<FinancialYearDetailsPage />}
                />
                <Route
                  path="/financial-year/create"
                  element={<FinancialYearCreatePage />}
                />
                <Route
                  path="/financial-year/edit/:id"
                  element={<FinancialYearEditPage isEdit={true} />}
                />
                <Route
                  path="/financial-year/view"
                  element={<FinancialYearDetailsPage />}
                />

                {/* tex rates => tax-rates` */}
                <Route path="/tax-rates" element={<TaxRatesPage />} />
                <Route
                  path="/tax-rates/:id"
                  element={<TaxRatesDetailsPage />}
                />
                <Route
                  path="/tax-rates/create"
                  element={<TaxRatesCreatePage />}
                />
                <Route
                  path="/tax-rates/edit/:id"
                  element={<TaxRatesEditPage isEdit={true} />}
                />
                <Route
                  path="/tax-rates/view"
                  element={<TaxRatesDetailsPage />}
                />

                {/* candidateList => candidate-list` */}
                <Route path="/candidate-list" element={<CandidateListPage />} />
                <Route
                  path="/candidate-list/:id"
                  element={<CandidateListDetailsPage />}
                />
                <Route
                  path="/candidate-list/create"
                  element={<CandidateListCreatePage />}
                />
                <Route
                  path="/candidate-list/edit/:id"
                  element={<CandidateListEditPage isEdit={true} />}
                />
                <Route
                  path="/candidate-list/view"
                  element={<CandidateListDetailsPage />}
                />

                {/* candidateSelections => candidate-selections */}
                <Route
                  path="/candidate-selections"
                  element={<CandidateSelectionsPage />}
                />
                <Route
                  path="/candidate-selections/:id"
                  element={<CandidateSelectionsDetailsPage />}
                />
                <Route
                  path="/candidate-selections/create"
                  element={<CandidateSelectionsCreatePage />}
                />
                <Route
                  path="/candidate-selections/edit/:id"
                  element={<CandidateSelectionsEditPage isEdit={true} />}
                />
                <Route
                  path="/candidate-selections/view"
                  element={<CandidateSelectionsDetailsPage />}
                />

                {/* Commission */}

                <Route path="/commission" element={<CommissionPage />} />
                <Route
                  path="/commission/:id"
                  element={<CommissionDetailsPage />}
                />
                <Route
                  path="/commission/create"
                  element={<CommissionCreatePage />}
                />
                <Route
                  path="/commission/edit/:id"
                  element={<CommissionEditPage isEdit={true} />}
                />
                <Route
                  path="/commission/view"
                  element={<CommissionDetailsPage />}
                />

                {/* TimeSheet */}
                <Route path="/timesheet" element={<TimeSheetPage />} />

                {/* Database */}
                <Route path="/database" element={<DataabsePage />} />

                {/* Icons */}
                <Route path="/icons" element={<IconsCreatePage />} />

                {/* Chart of Accounts */}
                <Route
                  path="/chart-of-accounts"
                  element={<ChartOfAccountsPage />}
                />

                {/* Delivery Order Logistic */}
                <Route
                  path="/delivery-order-logistic"
                  element={<DeliveryOrderLogisticPage />}
                />
                <Route
                  path="/delivery-order-logistic/create"
                  element={<DeliveryOrderLogisticCreatePage />}
                />
                <Route
                  path="/delivery-order-logistic/:id"
                  element={<DeliveryOrderLogisticDetailsPage />}
                />

                <Route
                  path="/delivery-order-logistic/edit/:id"
                  element={<DeliveryOrderLogisticEditPage isEdit={true} />}
                />

                <Route path="/birth-report" element={<BirthReportPage />} />

                <Route
                  path="/birth-report/create"
                  element={<BirthReportCreatePage />}
                />

                <Route
                  path="/birth-report/:id"
                  element={<BirthReportDetailsPage />}
                />

                <Route
                  path="/birth-report/edit/:id"
                  element={<BirthReportEditPage isEdit={true} />}
                />

                <Route
                  path="/birth-report/view"
                  element={<BirthReportDetailsPage />}
                />

                <Route path="/death-report" element={<DeathReportPage />} />
                <Route
                  path="/death-report/create"
                  element={<DeathReportCreatePage />}
                />
                <Route
                  path="/death-report/:id"
                  element={<DeathReportDetailsPage />}
                />
                <Route
                  path="/death-report/edit/:id"
                  element={<DeathReportEditPage isEdit={true} />}
                />
                <Route
                  path="/death-report/view"
                  element={<DeathReportDetailsPage />}
                />

                <Route
                  path="/investigation-report"
                  element={<InvestigationReportPage />}
                />

                <Route
                  path="/investigation-report/create"
                  element={<InvestigationReportCreatePage />}
                />

                <Route
                  path="/investigation-report/:id"
                  element={<InvestigationReportDetailsPage />}
                />

                <Route
                  path="/investigation-report/edit/:id"
                  element={<InvestigationReportEditPage isEdit={true} />}
                />

                <Route
                  path="/investigation-report/view"
                  element={<InvestigationReportDetailsPage />}
                />

                <Route
                  path="/operation-report"
                  element={<OperationReportPage />}
                />
                <Route
                  path="/operation-report/create"
                  element={<OperationReportCreatePage />}
                />
                <Route
                  path="/operation-report/:id"
                  element={<OperationReportDetailsPage />}
                />
                <Route
                  path="/operation-report/edit/:id"
                  element={<OperationReportEditPage isEdit={true} />}
                />
                <Route
                  path="/operation-report/view"
                  element={<OperationReportDetailsPage />}
                />

                <Route
                  path="/assign-by-representative"
                  element={<AssignRepresentativePage />}
                />

                <Route path="/medicine" element={<MedicinePage />} />
                <Route
                  path="/medicine/create"
                  element={<MedicineCreatePage />}
                />
                <Route
                  path="/medicine/edit/:id"
                  element={<MedicineEditPage isEdit={true} />}
                />
                <Route path="/medicine/view" element={<MedicineDetails />} />
                <Route path="/medicine/:id" element={<MedicineDetails />} />

                <Route
                  path="/customer-statement"
                  element={<CustomerStatementPage />}
                />
                <Route
                  path="/customer-statement/statements"
                  element={<CustomerStatements />}
                />
                <Route
                  path="/customer-statement/:id"
                  element={<CustomerStatementDetails />}
                />
                <Route
                  path="/customer-statement/edit/:id"
                  element={<CustomerStatementEditPage isEdit={true} />}
                />

                <Route
                  path="/employee-statement"
                  element={<EmployeeStatementPage />}
                />
                <Route
                  path="/employee-statement/:id"
                  element={<EmployeeStatementDetails />}
                />

                <Route
                  path="/employee-statement/statements"
                  element={<EmployeeStatements />}
                />

                <Route
                  path="/supplier-statement"
                  element={<SupplierStatementPage />}
                />
                <Route
                  path="/supplier-statement/:id"
                  element={<SupplierStatementDetails />}
                />
                <Route
                  path="/supplier-statement/statements"
                  element={<SupplierStatements />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
