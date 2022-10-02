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
    let f = data.map((p) => p.pname);
    // console.log(data);
    const getSortedUniqueData = (array) => [...new Set(array)];

    return getSortedUniqueData(f);
    // array.filter(
    //
    //   (currentValue, index, rr) => arr.indexOf(currentValue) === index
    // );
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
              <div className="flex mt-2 divide-x-4 divide-double">
                {goingFlights.map((f, i) => (
                  <span key={i} className="px-2 text-gray-600 ">
                    {f}
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
              <div className="flex mt-2 divide-x-4 divide-double">
                {comingFlights.map((f, i) => (
                  <span key={i} className="px-2 text-gray-600 ">
                    {f}
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
