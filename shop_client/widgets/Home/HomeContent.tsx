import Link from "next/link";
import Image from "next/image";
import styles from "./HomeContent.module.scss";
import { Button } from "@/shared/components/Button";
import { links } from "@/shared/config/links";
import { LinkButton } from "@/shared/components/LinkButton";

import BannerBg from "@/assets/images/home/banner.png";

export const HomeContent = () => {
  return (
    <div className="wrapper">
      <section className={styles.banner}>
        <Image src={BannerBg} fill sizes="100vw" alt="" />
      </section>
    </div>
  );
};
