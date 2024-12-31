import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { mockUsers } from '../data/mockData';

export const useTeamMembers = (memberIds: string[]) => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!memberIds.length) {
        setMembers([]);
        return;
      }

      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const filteredMembers = mockUsers.filter(user => 
          memberIds.includes(user.id)
        );
        setMembers(filteredMembers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [memberIds]);

  return { members, loading, error };
};

export default useTeamMembers;