import SiteLayout from './(site)/layout';
import HomePage from './(site)/page';

export { metadata } from './(site)/page';

export default function Home() {
  return (
    <SiteLayout>
      <HomePage />
    </SiteLayout>
  );
}
