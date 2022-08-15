import { Link, Outlet } from "@remix-run/react";
import Header from "~/components/header";

import { useOptionalUser, shuffle } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <>
      <Header />
      <main className="relative min-h-screen sm:flex sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto pt-16 max-w-7xl sm:px-6 lg:px-8">
            <div className="relative sm:overflow-hidden sm:rounded-2xl">
              <div className="relative px-4 pt-16 pb-2 sm:px-6 sm:pt-4 pb-8 lg:px-8 lg:pt-4">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="uppercase text-yellow-500 drop-shadow-md">
                    noraves
                  </span>
                  <span className="text-lg font-mono font-normal ml-2 text-gray-300 whitespace-pre">/ˈnɔːrə/ NOR-ə</span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                  Dein Ort für alle Rave Infos rund um Köln / Bonn!
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  {user ? (
                    <Link
                      to="/notes"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Hey {user.email}, checkout your Dashboard!
                    </Link>
                  ) : (
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <Link
                        to="/join"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                      >
                        Registrieren
                      </Link>
                      <Link
                        to="/login"
                        className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
                      >
                        Anmelden
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
            <div className="mt-6 flex flex-wrap justify-center gap-8">
              {[
                {
                  uid: 415,
                  title: 'CSD Techno Rave',
                  planner: 'Elements',
                  thumbnail: '/thumbnails/elements-csd.png',
                  date: new Date('2022-07-02'),
                  drinks: true,
                  cigarettes: false,
                  price: [{
                    type: 'AK',
                    amount: 5
                  }],
                  location: 'Köln',
                  locationGroup: 'https://web.whatsapp.com/',
                  description: 'Hey am Samstag den 02.07 geht es wieder los!\nDiesmal wieder mit einer Bar vor Ort und 5€ AK.'
                },
                {
                  uid: 415,
                  title: null,
                  planner: ['Elements', '2fast'],
                  thumbnail: '/thumbnails/elements-2fast.png',
                  date: new Date('2022-06-25'),
                  price: [{
                    type: 'AK',
                    amount: 5
                  }],
                  drinks: true,
                  cigarettes: false,
                  location: 'Köln',
                  groups: [
                    { title: 'Standort Gruppe', link: 'https://web.whatsapp.com/' }
                  ],
                  description: 'Hey am Samstag den 25.06 geht es wieder los!\nDiesmal wieder mit einer Bar vor Ort und 5€ AK.'
                }
              ].map(rave => (
                <div key={rave.uid} className="w-[350px] rounded-b inline-block border-2 overflow-hidden">
                  <img src={rave.thumbnail} className="block" width="350px" height="350px" />
                  <div className="block min-h-8 max-w-full p-3 pt-2">
                    <span className="font-bold mb-1 block">{[Array.isArray(rave.planner) ? rave.planner.join(' x ') : rave.planner, rave.title && rave.planner ? ' - ' : '', rave.title].join('')}</span>
                    <p className="mb-3">{rave.description}</p>
                    {rave.groups?.map(group => (
                      <a key={JSON.stringify(group) + '*' + Math.random()} className="block text-red-600 hover:text-red-500" href={group.link}>{group.title}</a>
                    ))}
                    <hr className="my-3" />
                    <ul>
                      <li>Datum: {rave.date.toLocaleDateString('de-DE')}</li>
                      <li>Preis: {rave.price.map(p => p.amount + '€ ' + p.type).join(', ')}</li>
                      <li>Bar: {[
                        rave.drinks ? 'Drinks' : null,
                        rave.cigarettes ? 'Zigaretten' : null,
                      ].filter(_ => !!_).join(', ')}</li>
                      <li>Ort: {rave.location}</li>
                    </ul>
                  </div>
                </div>
              ))}
              {/*<Outlet />*/}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
