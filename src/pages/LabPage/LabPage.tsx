import { useAppDispatch, useAppSelector } from '~/hooks';

const LabPage = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state);

  return <section className="section">LabPage Component</section>;
};

export default LabPage;
