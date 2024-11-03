"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Upload,
  Package,
  Clock,
  Users,
  ShoppingCart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { getProfile } from "@/api/profile";
import { useState, useEffect } from "react";
import { getEmployees } from '../api/employees';

export default function HomePage() {
  const { user } = useAuth();
  const isAuthorized = useAuthRedirect(["default", "admin", "employee"]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const fetchProfileData = async () => {
    try {
      const profileData = await getProfile();
      setName(profileData.name_user);
      setRole(profileData.role_user);
    } catch (error) {
      console.error(
        "Error fetching profile data:",
        error.response?.data || error.message
      );
    }
  };

  const fetchTotalEmployees = async () => {
    try {
      const employees = await getEmployees();
      setTotalEmployees(employees.length);
    } catch (error) {
      console.error('Error al obtener el total de empleados:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchTotalEmployees();
  }, []);

  if (!isAuthorized) {
    return null;
  }
  
  return (
    <div className="flex flex-col gap-6">
      {/* Sección de bienvenida */}
      <div className="flex items-center justify-between">
        <div style={{ minHeight: "3rem" }}>
          <p className="text-2xl font-bold text-primary">
            Bienvenido/a de nuevo{" "}
          </p>
          <p className="text-3xl font-semibold">{name || "Cargando..."}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos"
              className="w-[250px] pl-8"
            />
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Sube un Producto
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background border-none rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col justify-between space-y-0">
              <CardTitle className="text-sm font-medium mb-2">
                Total Productos
              </CardTitle>
              <div className="text-2xl font-bold">1,134</div>
              <p className="text-xs text-green-500">+10% esta semana</p>
            </div>
            <Package className="h-8 w-8 text-muted-foreground ml-auto" />
          </div>
        </Card>
        <Card className="bg-background border-none rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col justify-between space-y-0">
              <CardTitle className="text-sm font-medium mb-2">
                Ventas Recientes
              </CardTitle>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">Últimos 7 días</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-muted-foreground ml-auto" />
          </div>
        </Card>
        <Card className="bg-background border-none rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col justify-between space-y-0">
              <CardTitle className="text-sm font-medium mb-2">
                Total Empleados
              </CardTitle>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </div>
            <Users className="h-8 w-8 text-muted-foreground ml-auto" />
          </div>
        </Card>
        <Card className="bg-background border-none rounded-lg shadow-sm">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-col justify-between space-y-0">
              <CardTitle className="text-sm font-medium mb-2">
                Actividad del Taller
              </CardTitle>
              <div className="text-2xl font-bold">5 meses</div>
              <p className="text-xs text-muted-foreground">
                Activo desde ago 2023
              </p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground ml-auto" />
          </div>
        </Card>
      </div>

      {/* Actividad Reciente y Productos Principales */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Actividad Reciente */}
        <Card className="bg-background border-none">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                action: "Reparó",
                item: "Sistema de Cambios MTB",
                time: "hace 2 horas",
              },
              {
                action: "Vendió",
                item: "Candado Premium para Bicicleta",
                time: "hace 3 horas",
              },
              {
                action: "Mantuvo",
                item: "Batería para Bicicleta Eléctrica",
                time: "hace 5 horas",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between rounded-lg border-none p-3 bg-background"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div>
                  <p className="font-medium">
                    {activity.action} {activity.item}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Productos Principales */}
        <Card className="bg-background border-none">
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Candado Premium para Bicicleta",
                category: "Accesorios",
                sales: "125 ventas",
                image: "",
              },
              {
                name: "Llantas Todo Terreno",
                category: "Repuestos",
                sales: "98 ventas",
                image: "",
              },
              {
                name: "Batería para Bicicleta Eléctrica",
                category: "Componentes",
                sales: "72 ventas",
                image: "",
              },
            ].map((product) => (
              <motion.div
                key={product.name}
                className="flex items-center gap-4 rounded-lg border-none p-4 bg-background"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  alt={product.name}
                  className="h-10 w-10 rounded-lg object-cover"
                  src={product.image}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.sales}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
