import { useNavigate, useParams } from "react-router-dom";
import UpdateVenuePage from "./updateVenuePage";
import useAuthStore from "../js/store/useAuthStore";
import { useEffect, useState } from "react";
import { fetchVenueById } from "../js/API/fetchVenue";

export default function ProtectedUpdateVenuePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOwnership() {
      try {
        const venueData = await fetchVenueById(id);
        if (venueData && venueData.data.owner.name === user.data.name) {
          setVenue(venueData.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching venue data: ", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    checkOwnership();
  }, [id, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <UpdateVenuePage venue={venue} />;
}
