"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Province {
  code: number;
  name: string;
}

interface District {
  code: number;
  name: string;
}

interface Ward {
  code: number;
  name: string;
}

interface AddressSelectorProps {
  onChange: (address: {
    province: Province | null;
    district: District | null;
    ward: Ward | null;
  }) => void;
}

export const AddressSelectorWithSelect = ({ onChange }: AddressSelectorProps) => {


   const [isMounted,setIsMounted] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  function smartSortByName(a: { name: string }, b: { name: string }) {
    const getNumber = (str: string) => {
      const match = str.match(/\d+/);
      return match ? parseInt(match[0]) : Infinity;
    };
  
    const numA = getNumber(a.name);
    const numB = getNumber(b.name);
  
    if (numA !== Infinity && numB !== Infinity) {
      return numA - numB;
    }
  
    return a.name.localeCompare(b.name);
  }
  useEffect(() => {
    setIsMounted(true)
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then(setProvinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          const sortedDistricts = (data.districts || []).sort(smartSortByName);
          setDistricts(sortedDistricts);
        });
    } else {
      setDistricts([]);
    }
    setSelectedDistrict(null);
    setSelectedWard(null);
    setWards([]);
  }, [selectedProvince]);
  
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          const sortedWards = (data.wards || []).sort(smartSortByName);
          setWards(sortedWards);
        });
    } else {
      setWards([]);
    }
    setSelectedWard(null);
  }, [selectedDistrict]);

  useEffect(() => {
    onChange({
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    });
  }, [selectedProvince, selectedDistrict, selectedWard]);
  if(!isMounted) return null;
  return (
    <div className="space-y-2">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 space-y-1">
        <Label>Tỉnh / Thành phố</Label>
        <Select
          onValueChange={(value: any) => {
            const province = provinces.find((p) => String(p.code) === value) || null;
            setSelectedProvince(province);
          }}
        >
          <SelectTrigger className="min-w-full">
            <SelectValue placeholder="Chọn tỉnh / thành phố" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((p) => (
              <SelectItem key={p.code} value={String(p.code)}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  
      <div className="flex-1 space-y-1">
        <Label>Quận / Huyện</Label>
        <Select
          disabled={!selectedProvince}
          onValueChange={(value: any) => {
            const district = districts.find((d) => String(d.code) === value) || null;
            setSelectedDistrict(district);
          }}
        >
          <SelectTrigger className="min-w-full">
            <SelectValue placeholder="Chọn quận / huyện" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.code} value={String(d.code)}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  
      <div className="flex-1 space-y-1">
        <Label>Phường / Xã</Label>
        <Select
          disabled={!selectedDistrict}
          onValueChange={(value: any) => {
            const ward = wards.find((w) => String(w.code) === value) || null;
            setSelectedWard(ward);
          }}
        >
          <SelectTrigger className="min-w-full">
            <SelectValue placeholder="Chọn phường / xã" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((w) => (
              <SelectItem key={w.code} value={String(w.code)}>
                {w.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
  
  );
};
