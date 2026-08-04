import React from 'react';
import {
  View, Text, StyleSheet, Pressable, Modal,
  KeyboardAvoidingView, Platform, TextInput, FlatList,
  ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '@/constants/theme';
import { BotDomain } from '@/constants/data';
import { useDemoChat, Language } from '@/hooks/useDemoChat';

interface DemoChatModalProps {
  visible: boolean;
  bot: BotDomain | null;
  language: Language;
  onClose: () => void;
}

export function DemoChatModal({ visible, bot, language, onClose }: DemoChatModalProps) {
  const { messages, inputText, setInputText, sendMessage, resetChat, isTyping, getSuggestedReply } =
    useDemoChat(bot?.id ?? 'customer', language);

  const suggested = getSuggestedReply();

  if (!bot) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={[styles.root, { backgroundColor: Colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={bot.image} style={styles.avatar} contentFit="cover" />
            <View>
              <Text style={styles.botName}>{language === 'ar' ? bot.nameAr : bot.nameEn}</Text>
              <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>{language === 'ar' ? 'جاهز للمحادثة' : 'Ready to chat'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              onPress={() => resetChat()}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
              hitSlop={8}
            >
              <MaterialIcons name="refresh" size={20} color={Colors.textSecondary} />
            </Pressable>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
              hitSlop={8}
            >
              <MaterialIcons name="close" size={22} color={Colors.textSecondary} />
            </Pressable>
          </View>
        </View>

        {/* Demo badge */}
        <View style={styles.demoBadge}>
          <MaterialIcons name="info-outline" size={14} color={Colors.accent} />
          <Text style={styles.demoBadgeText}>
            {language === 'ar' ? 'وضع الديمو — تجربة محادثة اصطناعية' : 'Demo Mode — Simulated conversation'}
          </Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages}
          keyExtractor={m => m.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isBot = item.role === 'bot';
            return (
              <View style={[styles.msgRow, isBot ? styles.msgRowBot : styles.msgRowUser]}>
                {isBot && (
                  <Image source={bot.image} style={styles.msgAvatar} contentFit="cover" />
                )}
                <View
                  style={[
                    styles.bubble,
                    isBot
                      ? [styles.bubbleBot, { borderColor: bot.color + '44' }]
                      : styles.bubbleUser,
                  ]}
                >
                  <Text style={[styles.bubbleText, !isBot && styles.bubbleTextUser]}>
                    {language === 'ar' ? item.textAr : item.textEn}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            isTyping ? (
              <View style={[styles.msgRow, styles.msgRowBot]}>
                <View style={styles.msgAvatar} />
                <View style={[styles.bubble, styles.bubbleBot]}>
                  <ActivityIndicator size="small" color={bot.color} />
                </View>
              </View>
            ) : null
          }
        />

        {/* Suggested reply */}
        {suggested && !isTyping && (
          <TouchableOpacity
            style={[styles.suggestedBtn, { borderColor: bot.color + '66' }]}
            onPress={() => sendMessage(suggested)}
            activeOpacity={0.7}
          >
            <MaterialIcons name="chat-bubble-outline" size={14} color={bot.color} />
            <Text style={[styles.suggestedText, { color: bot.color }]} numberOfLines={1}>
              {suggested}
            </Text>
          </TouchableOpacity>
        )}

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={300}
            onSubmitEditing={() => sendMessage()}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendBtn,
              { backgroundColor: bot.color },
              pressed && { opacity: 0.8 },
              !inputText.trim() && { opacity: 0.4 },
            ]}
            onPress={() => sendMessage()}
            disabled={!inputText.trim()}
          >
            <MaterialIcons name="send" size={18} color="#FFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  botName: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.success },
  statusText: { color: Colors.success, fontSize: FontSize.xs },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center', justifyContent: 'center',
  },
  demoBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: Spacing.md, paddingVertical: 6,
    backgroundColor: Colors.accentDim,
    borderBottomWidth: 1, borderBottomColor: Colors.accent + '33',
  },
  demoBadgeText: { color: Colors.accent, fontSize: FontSize.xs },
  messageList: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, gap: 12 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  msgRowBot: { justifyContent: 'flex-start' },
  msgRowUser: { justifyContent: 'flex-end' },
  msgAvatar: { width: 30, height: 30, borderRadius: 15 },
  bubble: {
    maxWidth: '80%', paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: Radius.lg, borderWidth: 1,
  },
  bubbleBot: { backgroundColor: Colors.surfaceElevated, borderColor: Colors.border },
  bubbleUser: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  bubbleText: { color: Colors.textPrimary, fontSize: FontSize.sm, lineHeight: 20 },
  bubbleTextUser: { color: '#FFF' },
  suggestedBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginHorizontal: Spacing.md, marginBottom: 8,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Radius.full, borderWidth: 1,
    backgroundColor: Colors.surfaceElevated,
  },
  suggestedText: { fontSize: FontSize.sm, flex: 1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: Spacing.md, paddingBottom: Platform.OS === 'ios' ? 28 : 12, paddingTop: 10,
    backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, minHeight: 44, maxHeight: 100,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    color: Colors.textPrimary, fontSize: FontSize.sm,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
});
