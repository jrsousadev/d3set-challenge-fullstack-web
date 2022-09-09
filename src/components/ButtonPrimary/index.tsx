import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    loading?: boolean;
    children: any;
    variant?: "contained" | "outlined" | "text";
    href?: string;
    onHandleClick?: () => void;
    type?: string;
  };

export const ButtonPrimary = ({
  loading,
  children,
  variant,
  href,
  onHandleClick,
  type,
}: ButtonPrimaryProps) => (
  <>
    {href && (
      <Link href={href} passHref>
        <Button variant={variant} onClick={onHandleClick} type={type}>
          <>
            {loading ? (
              <>{loading ? <CircularProgress size={25} /> : "Entrar"}</>
            ) : (
              <>{children}</>
            )}
          </>
        </Button>
      </Link>
    )}
    {!href && (
      <Button variant={variant} onClick={onHandleClick} type={type}>
        <>
          {loading ? (
            <>{loading ? <CircularProgress size={25} /> : "Entrar"}</>
          ) : (
            <>{children}</>
          )}
        </>
      </Button>
    )}
  </>
);
