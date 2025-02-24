import { Button } from "@heroui/button";
import React from "react";
import { Divider } from "@heroui/react";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import { isEmpty } from "lodash";

export default async function Home(props: { searchParams: any }) {
  return (
    <>
      <div className="light h-screen bg-[#f6eee3] flex flex-col justify-between overflow-hidden ">
        <header>
          <div className=" flex flex-row justify-center ">
            <div className="flex flex-col w-full max-w-[1336px] py-2 px-4 ">
              <div className="flex flex-row justify-between">
                <h1 className="text-primary font-brand font-bold text-3xl">Inkwell.</h1>
                <div className="flex flex-row gap-2 items-center">
                  <Button
                    as={Link}
                    href="/signin"
                    className="mr-2"
                    variant="light"
                    color="primary"
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button color="primary" size="sm" as={Link} href="/signup">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </header>
        <main>
          <div className=" flex flex-row justify-center items-center ">
            <div className="flex flex-col w-full gap-4 px-4 max-w-[1336px] ">
              <h1 className="text-primary font-serif text-7xl">Where Ideas Flow.</h1>
              <desc className="text-primary  text-2xl ">
                Inkwell is a platform for writing, reading, and sharing ideas. Find inspiring
                stories, share your thoughts, and join a community of passionate writers and
                readers.
              </desc>
              <Button className="w-fit mt-5" color="primary" size="lg" as={Link} href={"/signup"}>
                Get Started!
              </Button>
            </div>
          </div>
        </main>
        <footer>
          <Divider />
          <div className=" flex flex-row justify-center  ">
            <div className="flex flex-col w-full  max-w-[1336px] py-2  ">
              <h2 className="text-primary">@Copyright by Inkwell.</h2>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
