import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CapstoneProjectsContext = createContext(null);
const apiUrl = 'http://localhost:8000';

export const CapstoneProjectsProvider = ({ children }) => {
  const [capstones, setCapstones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchCapstones();
  }, []);

  const fetchCapstones = async (search = '') => {
    const url = apiUrl + '/api/capstones' + (search ? '?q=' + search : '');
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + user.access_token,
      },
    });
    const data = await response.json();
    if (data.results) {
      setCapstones(data.results ?? []);
    } else {
      setCapstones([]);
    }
    setLoading(false);
  };

  const uploadDocx = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true);
      const res = await fetch(apiUrl + '/api/capstones/upload-docx', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    } finally {
      setUploading(false);
    }
  };

  const addCapstone = async (form) => {
    try {
      const formData = new FormData(form);
      console.log('formData', formData);
      setLoading(true);
      const res = await fetch(apiUrl + '/api/capstones', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + user.access_token,
        },
        body: formData,
      });
      if (!res.ok) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCapstone = async (id, form) => {
    try {
      const formData = new FormData(form);
      console.log('formData', formData);
      setLoading(true);
      const res = await fetch(apiUrl + '/api/capstones/' + id, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + user.access_token,
        },
        body: formData,
      });
      if (!res.ok) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCapstone = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl + '/api/capstones/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + user.access_token,
        },
      });
      if (!res.ok) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CapstoneProjectsContext.Provider
      value={{
        capstones,
        uploading,
        fetchCapstones,
        uploadDocx,
        addCapstone,
        updateCapstone,
        deleteCapstone,
      }}
    >
      {children}
    </CapstoneProjectsContext.Provider>
  );
};

export const useCapstoneContext = () => {
  return useContext(CapstoneProjectsContext);
};
