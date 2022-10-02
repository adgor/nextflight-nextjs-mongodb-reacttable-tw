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

export default function Home({ posts, coming }) {
  // console.log(posts);
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
        <h1 className="text-4xl italic font-extrabold tracking-tight text-center text-gray-900 uppercase sm:text-5xl md:text-6xl">
          <span className="text-indigo-600 ">next</span>Flight
        </h1>

        <div className="grid max-w-screen-lg gap-8 row-gap-6 sm:mx-auto lg:grid-cols-2 ">
          <FullFeatureTable posts={posts} />
          <FullFeatureTable posts={coming} />
        </div>

        {/* <PaginationTable posts={posts} /> */}
        {/* <SortingFilteringTable posts={posts} /> */}
        {/* <FilteringTable posts={posts} /> */}
        {/* <SortingTable posts={posts} /> */}
        {/* <BasicTable posts={posts} /> */}

        <Modal deletePosts={() => deleteAllPosts()} />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const postsCollection = db.collection("going_flights");
  const comingCollection = db.collection("coming_flights");

  const posts = await postsCollection.find().toArray();
  const coming = await comingCollection.find().toArray();
  // console.log(posts);

  return {
    props: {
      posts: posts.map((post) => ({
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
