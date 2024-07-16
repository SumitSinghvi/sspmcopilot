import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FeatureFormModal } from "./FeatureFormModal";
import { useState } from "react";

export default function FeatureListTable({ data }: { data: any }) {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-[14px]">
              <Checkbox className="mr-2" />
              ID's
            </TableHead>
            <TableHead className="w-[200px] text-[14px]">Title</TableHead>
            <TableHead className="text-[14px]">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any, index: any) => {
            return (
              <TableRow key={index}>
                <TableCell className="text-[14px]">
                  <Checkbox className="mr-2"  />
                  {item.id}
                </TableCell>
                <TableCell className="text-[14px]">{item.title}</TableCell>
                <TableCell className="text-[14px]">
                  {item.Description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
