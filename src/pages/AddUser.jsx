import MultiStepForm from "../components/multi-step-form/MultiStepForm";
import usePageTitle from "../hooks/usePageTitle";

const AddUser = () => {
  usePageTitle("Latihan SIFina | Tambah Pengguna");
  return (
    <div>
      <MultiStepForm />
    </div>
  );
};

export default AddUser;
