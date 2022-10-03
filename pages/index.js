import { Fragment } from "react";
import Head from "next/head";
import { connectToDatabase } from "../utils/mongodb";
import { useRouter } from "next/router";

import { FullFeatureTable } from "../src/components/FullFeatureTable";
import Modal from "../src/components/Modal";
// import { PaginationTable } from "../src/components/PaginationTable";
// import { SortingFilteringTable } from "../src/components/SortingFilteringTable";
// import FilteringTable from "../src/components/FilteringTable";
// import SortingTable from "../src/components/SortingTable";
// import BasicTable from "../src/components/BasicTable";

export default function Home({ going, coming }) {
  // console.log(going);

  // let res = going.map((p) => p.pname);

  const getUniqueValues = (data) => {
    // get flight origin
    let f = data.map((p) => p.pname);
    // console.log(data);

    // get uniqe flight origin
    // const getSortedUniqueData = (array) => [...new Set(array)];

    //get each origin w/ total flight
    const counts = {};
    f.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    // set each flight w/ tot flight to array item
    let toArr = Object.entries(counts);

    // return unique origin && flight nr. for each origin
    return toArr; // getSortedUniqueData(f);
  };

  // getUniqueValues(going);
  const goingFlights = getUniqueValues(going);
  const comingFlights = getUniqueValues(coming);

  const router = useRouter();
  const deleteAllPosts = () => {
    fetch("/api/deleteall");

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>NEXTFLIGHT</title>
      </Head>

      <main className="container px-5 mx-auto py-14">
        <h1 className="pb-6 text-4xl italic font-extrabold tracking-tight text-center text-gray-900 uppercase sm:text-5xl md:text-6xl">
          <span className="text-indigo-600 ">next</span>Flight
        </h1>

        <div className="grid max-w-screen-xl divide-x sm:mx-auto lg:grid-cols-2 ">
          <div className="sm:px-6">
            <div
              className="p-4 text-gray-700 border-l-4 border-gray-700 bg-gray-50"
              role="alert"
            >
              Departures:{" "}
              <span className="font-semibold "> {going.length} </span>- flights
              <div className="grid grid-cols-3 gap-1 mt-2 ">
                {goingFlights.map((f, ind) => (
                  <span
                    key={ind}
                    className="px-2 py-1 text-sm border text-gray-600"
                  >
                    {f[0]}: {f[1]}
                  </span>
                ))}
              </div>
            </div>
            <FullFeatureTable posts={going} />
          </div>

          <div className="sm:px-6">
            <div
              className="p-4 text-gray-700 border-l-4 border-gray-700 bg-gray-50"
              role="alert"
            >
              Arrivals:{" "}
              <span className="font-semibold "> {coming.length} </span>- flights
              <div className="grid grid-cols-3 gap-1 mt-2 ">
                {comingFlights.map((f, ind) => (
                  <span
                    key={ind}
                    className="px-2 py-1 text-sm border text-gray-600"
                  >
                    {f[0]}: {f[1]}
                  </span>
                ))}
              </div>
            </div>
            <FullFeatureTable posts={coming} />
          </div>
        </div>

        {/* <PaginationTable going={going} /> */}
        {/* <SortingFilteringTable going={going} /> */}
        {/* <FilteringTable going={going} /> */}
        {/* <SortingTable going={going} /> */}
        {/* <BasicTable going={going} /> */}

        <Modal deletePosts={() => deleteAllPosts()} />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const goingCollection = db.collection("going_flights");
  const comingCollection = db.collection("coming_flights");

  const going = await goingCollection.find().toArray();
  const coming = await comingCollection.find().toArray();
  // console.log(going);

  return {
    props: {
      going: going.map((post) => ({
        pname: post.destination,
        title: post.date,
        like: post.avgPrice,
        comment: post.currency,
        //   shares: post.shares,
        //   ptime: post.timeTooltip,
        //   // stime: post.stime,
        //   link: post.link,
      })),
      coming: coming.map((post) => ({
        pname: post.destination,
        title: post.date,
        like: post.avgPrice,
        comment: post.currency,
        //   shares: post.shares,
        //   ptime: post.timeTooltip,
        //   // stime: post.stime,
        //   link: post.link,
      })),
    },
    revalidate: 1800,
  };
}
