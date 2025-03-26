import Image from "next/image";
import logoDark from "../../../public/logo/logo-dark.png";
import logoLight from "../../../public/logo/logo-light.png";

export default function Logo() {
  return (
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 block dark:hidden">
        <Image
          src={logoLight}
          alt="hyunwoo.dev"
          width={24}
          height={24}
          priority
        />
      </div>

      <div className="absolute inset-0 hidden dark:block">
        <Image
          src={logoDark}
          alt="hyunwoo.dev"
          width={24}
          height={24}
          priority
        />
      </div>
    </div>
  );
}
