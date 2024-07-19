import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { updateData } from "@/lib/utils";
import { UpdateFormModal } from "./UpdateFormModal copy";
import { useStoreModal } from "./use-store-modal";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { FeatureFormModal } from "./FeatureFormModal";
// import { useState } from "react";

export default function FeatureListTable({ data }: { data: any }) {
  const storeModal = useStoreModal();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-[14px]">
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
                <TableCell className="text-[14px] uppercase">
                  {item._id.slice(-4)}
                </TableCell>
                <UpdateFormModal storeModal={storeModal} id={item._id}/>
                <TableCell className="text-[14px] capitalize">{item.Title}</TableCell>
                <TableCell className="text-[14px]">
                  {item.Description}
                </TableCell>
                <div className="flex justify-center items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={storeModal.onOpen}>
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateData({Archive: !item.Archive}, item._id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
