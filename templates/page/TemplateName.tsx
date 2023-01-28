import { useAppDispatch, useAppSelector } from '~/hooks';

const TemplateName = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state);

  return <section className="section">TemplateName Component</section>;
};

export default TemplateName;
