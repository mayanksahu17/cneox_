import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Photos from "../../../components/widget/team/Photos";

const TeamPhotos = () => {
  return (
    <>
      <main className="main-wrapper relative overflow-hidden">
        <Breadcrumb title="Team Photos" />
        <section id="team-section">
          <div className="pb-40 xl:pb-[220px]">
            <div className="global-container">
              <div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
                <div className="mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[746px]">
                  <h2>Our team consists of a group of talents</h2>
                </div>
              </div>
              <ul className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Photos />
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TeamPhotos;
